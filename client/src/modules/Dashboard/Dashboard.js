import React, { useEffect, useState } from "react";
import Avatar from "../../assets/avatar.svg";
import Phone from "../../assets/phone.svg";
import messageIcon from "../../assets/message.svg";
import Input from "../input";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Payment from "../../assets/payment.svg";

function Dashboard({handleLogout}) {
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
    if (!term) return setFilteredUsers(users.filter((u) => u._id !==user._id ));
    setFilteredUsers(
      users.filter(({ user }) => user.interest?.toLowerCase().includes(term))
    );
  }, [interest, users]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !user?._id) return;

    socket.emit("addUser", user._id);
    const handleGetMessage = (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message, createdAt: data.createdAt },
        ],
      }));
    };

  
    socket.on("getMessage", handleGetMessage);

    return () => {
      socket.off("getMessage", handleGetMessage);
    };
  }, [socket, user]);
  

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      const res = await fetch(
        `http://localhost:8000/api/conversation/${user._id}`
      );
      const data = await res.json();
      setConversation(data);
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
      const data = await res.json();
      // Ensure each message has a createdAt property (usually from DB timestamps)
      setMessages({
        messages: data,
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
    if (!receiver || !message.trim()) return;

    socket?.emit("sendMessage", {
      ConversationId: conversationId,
      senderId: user._id,
      message,
      receiverId: receiver.receiverId,
    });

    await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ConversationId: conversationId,
        senderId: user._id,
        message,
        receiverId: receiver.receiverId,
      }),
    });
    setMessage("");
    fetchMessage(conversationId, receiver, false);
  };

  return (
    <div className="w-screen h-screen flex flex-col px-12 bg-white">
      <header className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md flex items-center px-6 text-white font-semibold text-xl">
        <div className="flex items-center space-x-4">
          <img
            src={Avatar}
            height="50"
            width="50"
            alt="avatar"
            className="h-10 w-10 rounded-full"
          />
          <span>Welcome, {user.fullName || "User"}</span>
        </div>
        <nav className="ml-auto flex items-center space-x-8">
          <button onClick={() => navigate("/DashBoard")}>Dashboard</button>
          <button onClick={() => navigate("/Whatnew")}>What's New?</button>
          <button onClick={handleLogout}>Close Profile</button>
        </nav>
      </header>

      <div className="flex flex-grow overflow-hidden">
        <div className="w-[28%] h-full bg-blue-100 border-r-4 mt-6 p-4 overflow-y-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full bg-white p-4 rounded-lg shadow-lg">
              <img
                src={Avatar}
                className="w-12 h-12 rounded-full mx-auto"
                alt="avatar"
              />
              <div className="text-center mt-2">
                <div className="text-lg font-semibold">{user.fullName}</div>
                <div className="text-sm">{user.email}</div>
              </div>
            </div>
            <div className="text-xl font-bold">Connections</div>
            {conversation.map(({ conversationId, user: otherUser }) => (
              <div
                key={conversationId}
                className="w-full bg-white p-4 rounded-lg shadow hover:bg-blue-200 cursor-pointer"
                onClick={() => fetchMessage(conversationId, otherUser, true)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={Avatar}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <div className="font-semibold">{otherUser.fullName}</div>
                    <div className="text-sm">{otherUser.email}</div>
                    <div className="text-sm">{otherUser.interest}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[44%] h-full flex flex-col items-center border-x-4 mt-6 p-4">
          {addpage && selectedUser ? (
            <div className="w-full bg-white rounded-xl p-6 shadow-lg border-2 border-black">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={Avatar}
                    className="w-12 h-12 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <div className="text-xl font-bold">
                      {selectedUser.fullName}
                    </div>
                    <div className="text-sm">{selectedUser.email}</div>
                    <div className="text-sm">{selectedUser.interest}</div>
                  </div>
                </div>
                <button
                  onClick={() => setAddpage(false)}
                  className="text-red-500 font-bold text-xl"
                >
                  &times;
                </button>
              </div>
            </div>
          ) : messages.receiver ? (
            <>
              <div className="flex justify-between w-full p-4 bg-blue-100 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={Avatar}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                  <div>
                    <div className="font-semibold">
                      {messages.receiver.fullName}
                    </div>
                    <div className="text-sm">{messages.receiver.email}</div>
                  </div>
                </div>
                <img src={Phone} className="w-6 h-6" alt="phone" />
              </div>
              <div className="flex-1 w-full overflow-y-auto my-4 p-4 bg-gray-50 rounded-lg">
                {messages.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[60%] p-3 mb-2 rounded-lg ${
                      msg.user._id === user._id
                        ? "bg-blue-200 ml-auto"
                        : "bg-yellow-100"
                    }`}
                  >
                    <div>{msg.message}</div>
                    {msg.createdAt && (
                      <div className="text-xs text-black font-semibold text-right mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="w-full flex items-center gap-4">
                <Input
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded"
                />
                <img
                  src={Payment}
                  className="w-8 h-8 cursor-pointer"
                  alt="payment"
                  onClick={() =>
                    window.open(
                      "https://www.hdfcbank.com/personal/pay/money-transfer",
                      "_blank"
                    )
                  }
                />
                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                >
                  <img src={messageIcon} className="w-6 h-6" alt="send" />
                </button>
              </div>
            </>
          ) : (
            <div className="mt-20 text-center text-xl text-gray-500">
              No conversation selected
            </div>
          )}
        </div>

        <div className="w-[28%] h-full bg-blue-100 border-l-4 mt-6 p-4 overflow-y-auto">
          <div className="text-xl font-bold mb-4">Network</div>
          <Input
            placeholder="Search users by interest..."
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          {filteredUsers.map(({ user: u }) => (
            <div
              key={u._id}
              className="w-full bg-white p-4 mb-3 rounded-lg shadow hover:bg-blue-200 cursor-pointer"
              onClick={() => fetchMessage("new", u, true)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={Avatar}
                  className="w-10 h-10 rounded-full"
                  alt="avatar"
                />
                <div>
                  <div className="font-semibold">{u.fullName}</div>
                  <div className="text-sm">{u.email}</div>
                  <div className="text-sm">{u.interest}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
