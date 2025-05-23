const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
JWT_SECRET="secret"

require("dotenv").config();//used to load .env variable to process.env
require("./db/connection.js");

const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Messages = require("./models/Messages");

const app = express();
const server = http.createServer(app);// create HTTP server that uses Express app

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());//accept request from any domain
app.use(express.json());//parse request
app.use(express.urlencoded({ extended: false }));//url-encoded form data ko parse karta hai

//Socker io
let users = [];//stores online users[userid,socketid]
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("addUser", (userId) => {
    const exists = users.find((user) => user.userId === userId);
    if (!exists) {
      users.push({ userId, socketId: socket.id });
      io.emit("getUsers", users);//this line is used to tell all the usrs who  online usrs are
    }
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message, conversationId }) => {
    const receiver = users.find((user) => user.userId === receiverId);
    const sender = users.find((user) => user.userId === senderId);
    const user = await User.findById(senderId);
    if (receiver) {
      io.to(receiver.socketId).to(sender.socketId).emit("getMessage", {
        senderId,
        message,
        conversationId,
        receiverId,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          interest: user.interest,
        },
      });
    }
  });

socket.on("disconnect", () => { //when someone leaves ,remove them from online and tell everyone who is online
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
});

app.get("/", (req, res) => res.send("Welcome"));

// ===== Auth Endpoints =====
app.post("/api/register", async (req, res) => {
  try {
    const { fullName, email, password, interest } = req.body;

    if (!fullName || !email || !password || !interest) {
      return res.status(400).json({ message: "Please enter all required details." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      interest,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        interest: newUser.interest,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send("Invalid input");

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("Incorrect password");

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET || "Secret",
    { expiresIn: "24h" }
  );

  await User.updateOne({ _id: user._id }, { $set: { token } });

  res.status(200).json({
    message: "Login successful",
    user: { fullName: user.fullName, email: user.email, interest: user.interest, _id: user._id },
    token,
  });
});

//Conversation Endpoints
app.post("/api/conversation", async (req, res) => {
  const { senderId, receiverId } = req.body;
  if (!senderId || !receiverId) return res.status(400).send("Required IDs missing");

  let conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
  if (!conversation) {
    conversation = new Conversation({ members: [senderId, receiverId] });
    await conversation.save();
  }

  res.status(200).json({ conversationId: conversation._id });
});

app.get("/api/conversation/:userId", async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send("Invalid userId");

  const conversations = await Conversation.find({ members: userId });
  const result = await Promise.all(
    conversations.map(async (conv) => {
      const otherId = conv.members.find((id) => id.toString() !== userId);
      const user = await User.findById(otherId);
      return {
        user: {
          receiverId: user._id,
          fullName: user.fullName,
          email: user.email,
          interest: user.interest,
        },
        conversationId: conv._id,
      };
    })
  );

  res.status(200).json(result);
});

// Messages Endpoints 
app.post("/api/messages", async (req, res) => {
  let { ConversationId, senderId, message, receiverId } = req.body;
  if (!senderId || !message) return res.status(400).send("Required fields missing");

  if (ConversationId === "new" && receiverId) {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation({ members: [senderId, receiverId] });
      await conversation.save();
    }
    ConversationId = conversation._id;
  }

  const newMessage = new Messages({
    ConversationId,
    senderId,
    message,
  });
  await newMessage.save();

  res.status(201).send("Message sent successfully");
});

app.get("/api/messages/:ConversationId", async (req, res) => {
  let { ConversationId } = req.params;
  const { senderId, receiverId } = req.query;

  if (ConversationId === "new") {
    const conv = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conv) return res.status(200).json([]);
    ConversationId = conv._id;
  }

  const messages = await Messages.find({ ConversationId });
  const result = await Promise.all(
    messages.map(async (msg) => {
      const sender = await User.findById(msg.senderId);
      return {
        user: {
          _id: sender._id,
          email: sender.email,
          fullName: sender.fullName,
          interest: sender.interest,
        },
        message: msg.message,
      };
    })
  );

  res.status(200).json(result);
});

// Get Users
app.get("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const users = await User.find({ _id: { $ne: userId } });

  const result = users.map((user) => ({
    user: {
      email: user.email,
      fullName: user.fullName,
      receiverId: user._id,
      interest: user.interest,
    },
  }));

  res.status(200).json(result);
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from MongoDB

    const result =users.map(user => ({
      user: {
        email: user.email,
        fullName: user.fullName,
        receiverId: user._id,
        interest: user.interest||"",
      },
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(8080, () => {
  console.log("Socket server running on http://localhost:8080");
});
