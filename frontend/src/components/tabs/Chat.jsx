import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to the chat.", sender: "system", time: "10:00 AM" },
    { id: 2, text: "Hey! How's the course going?", sender: "user", time: "10:05 AM" },
    { id: 3, text: "Everything is going well, comrade.", sender: "system", time: "10:07 AM" },
    { id: 4, text: "Good to hear. Let's crush capitalism together.", sender: "user", time: "10:10 AM" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle message submission
  const sendMessage = useCallback(() => {
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
  }, [input, messages.length]);

  return (
    <div className="max-w-xl w-full mx-auto mt-4">
      {/* Chat Messages Box */}
      <div className="bg-[#04091C] border border-white border-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-white">
        <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${msg.sender === "user" ? "ml-auto" : ""}`}
              style={{ maxWidth: "75%", width: "fit-content" }}
            >
              {/* Sender Name and Time */}
              <div
                className={`text-xs text-gray-400 mb-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                {msg.sender === "user" ? "Joseph Stalin" : "Potato Head"} · {msg.time}
              </div>
              {/* Message Text */}
              <div
                className={`p-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Empty div to auto-scroll to the latest message */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input and Send Icon */}
      <div className="flex mt-4 border border-blue-500 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 bg-transparent text-white outline-none text-base placeholder-gray-400 border-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-transparent text-blue-500 hover:text-blue-400 transition flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>
        {`
          .scrollbar-transparent::-webkit-scrollbar {
            width: 8px;
          }
          .scrollbar-transparent::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-transparent::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
          }
          .scrollbar-transparent::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default Chat;