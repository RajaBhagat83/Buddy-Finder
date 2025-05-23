import React, { useEffect, useState } from "react";
import Avatar from "../../assets/avatar.svg";
import Phone from "../../assets/phone.svg";
import messageIcon from "../../assets/message.svg";
import Input from "../input";
import { io } from "socket.io-client";
import backgroundImage from "../../assets/Image.jpg";
import Arrow from "../../assets/arrow.svg";
import Whatnew from "../../Components/Whatnew";
import { useNavigate } from "react-router-dom";
import NewImage from "../../assets/newPhoto.jpg";
import Payment from "../../assets/payment.svg";
 
function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user:details")) || {};
  });
  const [addpage, setAddpage] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState({
    messages: [],
    receiver: null,
    conversationId: null,
  });
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [interest, setInterest] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const term = interest.trim().toLowerCase();
    if (!term) return setFilteredUsers(users);
    setFilteredUsers(
      users.filter(({ user }) => user.interest?.toLowerCase().includes(term))
    );
  }, [interest, users]);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");//connect to the websocket server
    setSocket(newSocket);//stors socket connection
    return () => newSocket.disconnect(); //clean component when unmount
  }, []);

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit("addUser", user._id); //register the user as online with server

    const handleGetUsers = (activeUsers) =>
      console.log("activeUsers", activeUsers);

    const handleGetMessage = (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    };

    socket.on("getUsers", handleGetUsers);
    socket.on("getMessage", handleGetMessage);

    return () => { //cleans the listeners when unmounts
      socket.off("getUsers", handleGetUsers);
      socket.off("getMessage", handleGetMessage);
    };
  }, [socket, user]);

  useEffect(() => {
    if (!user?._id) return; //waits until the user signin/signup
    (async () => { // get all the users conversation
      try {
        const res = await fetch(
          `http://localhost:8000/api/conversation/${user._id}`
        );
        if (!res.ok) throw new Error("Failed to fetch conversations");
        setConversation(await res.json());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${user._id}`);
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user]);

  const fetchMessage = async (conversationId, receiver, openProfile = true) => {
    if (!user?._id) return;
    try {
      const url =
        conversationId === "new"
          ? `http://localhost:8000/api/messages/new?senderId=${user._id}&receiverId=${receiver.receiverId}`
          : `http://localhost:8000/api/messages/${conversationId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch messages");
      setMessages({
        messages: await res.json(),
        receiver,
        conversationId,
      });
      if (openProfile) {
        setSelectedUser(receiver);
        setAddpage(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    const { conversationId, receiver } = messages;
    if (!receiver) {
      alert("Please select a conversation first");
      return;
    }
    if (!message.trim()) return;

    socket?.emit("sendMessage", {
      ConversationId: conversationId,
      senderId: user._id,
      message,
      receiverId: receiver.receiverId,
    });

    try {
      const res = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ConversationId: conversationId,
          senderId: user._id,
          message,
          receiverId: receiver.receiverId,
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setMessage("");
      fetchMessage(conversationId, receiver, false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col px-12 bg-white">
      {/* Top Task Bar */}
      <header className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md flex items-center px-6 text-white font-semibold text-xl select-none">
        <div className="flex items-center space-x-4">
          <img
            src={Avatar}
            height="50"
            width="50"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
          <span>Welcome, {user.fullName || "User"}</span>
        </div>
        <nav className="ml-auto flex items-center space-x-8">
          <button
            onClick={() => navigate("/")}
            className="hover:underline focus:outline-none"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/Whatnew")}
            className="hover:underline focus:outline-none"
          >
            What's New?
          </button>
          <button
            onClick={() => setAddpage(false)}
            className="hover:underline focus:outline-none"
          >
            Close Profile
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left Panel with gap and shadow separation */}
        <div
          className="w-[25%] h-full bg-blue-100  border-r-4  hidden lg:block "
          style={{ marginTop: 24, boxShadow: "2px 0 8px rgba(0,0,0,0.15)" }}
        >
          <div className="flex justify-center items-center p-4 h-[95px] w-[340px] bg-white rounded-xl shadow-lg ml-16 mt-4  hover:scale-105 hover:shadow-2xl cursor-pointer pr-12  hover:border-2 hover:border-blue-400">
            <img src={Avatar} alt="User Avatar" height={55} width={55} />
            <div className="font-semibold text-sm ml-6">
              <div className="text-xl font-semibold">{user.fullName}</div>
              <div className="text-sm">{user.email}</div>
            </div>
          </div>
          <hr />
          <div className="ml-10 mt-10 mr-7">
            <div className="mb-4 pl-6 text-3xl">Connections</div>
            <div className="border-t-2 border-white"></div>
            {conversation.length > 0 ? (
              conversation.map(({ conversationId, user: otherUser }) => (
                <div
                  key={conversationId}
                  className="flex justify-center p-0.5 cursor-pointer"
                  onClick={() => fetchMessage(conversationId, otherUser, true)}
                >
                  <div className="flex h-24 w-[470px] bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl cursor-pointer px-10 hover:border-2 hover:border-blue-400">
                    <img src={Avatar} height={55} width={55} />
                    <div className="font-semibold text-xl ml-6 pt-3">
                      <div>{otherUser.fullName}</div>
                      <div className="text-sm">{otherUser.email}</div>
                      <div className="text-sm">{otherUser.interest}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-12">
                No Conversations
              </div>
            )}
          </div>
        </div>

        {/* Middle Panel */}
        <div className="w-[50%] h-full flex flex-col items-center border-4 border-gray-300 mt-6 m-8">
          {addpage && selectedUser ? (
            <div className="w-full flex flex-col items-center mt-20">
              <div className="bg-white shadow-xl rounded-xl px-8 py-6 w-[50%] h-full text-center border-2 border-black">
                <button
                  className="text-red-500 text-xl font-bold float-right"
                  onClick={() => setAddpage(false)}
                >
                  ×
                </button>
                <div className="flex pr-12 mt-4">
                  <img
                    src={Avatar}
                    alt="User Avatar"
                    height={55}
                    width={55}
                    className="mx-auto mb-4"
                  />
                  <div className="font-serif">
                    <h2 className="text-2xl font-bold mt-3">
                      {selectedUser.fullName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                    <p className="text-sm text-gray-600 mt-3">
                      {selectedUser.interest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.receiver && (
                <div className="w-full lg:w-[85%] bg-[#f0f5fc] h-[80px] mt-14 rounded-xl flex items-center px-14 shadow-md">
                  <img
                    src={Avatar}
                    alt="Receiver Avatar"
                    height={55}
                    width={55}
                  />
                  <div className="ml-6 mr-auto">
                    <div className="font-semibold text-xl">
                      {messages.receiver.fullName}
                    </div>
                    <p className="text-sm font-light text-gray-600">
                      {messages.receiver.email}
                    </p>
                  </div>
                  <img src={Phone} alt="Call" />
                </div>
              )}

              <div className="h-[75%] border w-full overflow-y-auto">
                <div className="px-10 py-6 mx-4 flex flex-col space-y-3 font-medium font-serif text-lg">
                  {messages.messages.length > 0 ? (
                    messages.messages.map((msgObj, idx) => (
                      <div
                        key={idx}
                        className={`max-w-[40%] p-3 break-words ${
                          msgObj.user._id === user._id
                            ? "bg-[#14ddff7a] rounded-tl-lg ml-auto"
                            : "bg-[#e3e30e54] rounded-tr-lg"
                        }`}
                      >
                        {msgObj.message}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-lg font-semibold mt-12 flex justify-center items-center">
                      No Messages or No Conversation Selected
                    </div>
                  )}
                </div>
              </div>

              {messages.receiver && (
                <div className="p-6 w-full flex justify-center items-center border-t">
                  <Input
                    placeholder="Type a Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow mr-4 p-1 border-black w-full"
                  />

                  {/* Payment Icon (routes to HDFC site) */}
                  <img
                    src={Payment}
                    alt="Payment"
                    className="cursor-pointer w-8 h-8 mr-4"
                    onClick={() =>
                      (window.location.href =
                        "https://www.hdfcbank.com/personal/pay/money-transfer")
                    }
                  />

                  {/* Send Message Button */}
                  <button
                    disabled={!message.trim()}
                    onClick={sendMessage}
                    className={`cursor-pointer rounded-full ${
                      message.trim()
                        ? "opacity-100"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    aria-label="Send Message"
                  >
                    <img src={messageIcon} height={45} width={45} alt="Send"/>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-[25%] h-full overflow-scroll bg-blue-100 border-l-4 hidden lg:block mt-6 shadow-2xl">
          <div className="fixed right-5 top-3 rounded"></div>

          <div className="ml-10 pr-28 py-12">
            <div className="mb-4 pl-16 text-3xl cursor-pointer">Network</div>
            <div className="border-t-2 border-white"></div>
            <Input
              className="w-[100%] mb-4"
              placeholder="Search users by interest..."
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
            {filteredUsers.length > 0 ? (
              filteredUsers.map(({ user: targetUser }) => (
                <div
                  key={targetUser._id}
                  className="flex justify-center pl-24 p-0.5 cursor-pointer"
                  onClick={() => fetchMessage("new", targetUser, true)}
                >
                  <div className="flex">
                    <div className="flex h-24 w-[350px] bg-white rounded-xl shadow-lg ml-6  hover:scale-105 hover:shadow-2xl cursor-pointer pr-4  flex-wrap mr-12 hover:border-2 hover:border-blue-400">
                      <img
                        src={Avatar}
                        alt="User Avatar"
                        height={55}
                        width={55}
                        className="pl-3"
                      />
                      <div className="font-semibold text-xl ml-4 pt-3">
                        <div>{targetUser.fullName}</div>
                        <div className="text-sm">{targetUser.email}</div>
                        <div className="text-sm">{targetUser.interest}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-12">
                No users found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
