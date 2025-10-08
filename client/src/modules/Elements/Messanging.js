import React from 'react'
import Avatar from "../../assets/avatar.svg";
import Phone from "../../assets/phone.svg";
import messageIcon from "../../assets/message.svg";
import Input from "../input";
import Payment from "../../assets/payment.svg";


function Messanging({addpage,messages,setAddpage,setMessage,message,sendMessage,selectedUser,user}) {
  return (
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

  )
}

export default Messanging
