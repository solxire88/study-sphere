import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! Welcome to the chatbot.", sender: "system", time: "10:00 AM" },
    { id: 2, text: "Hey! How can I assist you today?", sender: "user", time: "10:05 AM" },
    { id: 3, text: "I'm here to help you with your queries.", sender: "system", time: "10:07 AM" },
    { id: 4, text: "Great! Let's get started.", sender: "user", time: "10:10 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-4">
      {/* Chat Messages Box */}
      <div className="bg-[#0A0F24] border border-[#1E2A47] backdrop-blur-md p-4 rounded-2xl shadow-lg text-white">
        <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${msg.sender === "user" ? "ml-auto" : ""}`}
              style={{ maxWidth: "75%", width: "fit-content" }}
            >
              <div className={`text-xs text-[#A6E1FA] mb-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                {msg.sender === "user" ? "You" : "Chatbot"} · {msg.time}
              </div>
              <div
                className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white shadow-lg"
                    : "bg-gradient-to-r from-[#1E2A47] to-[#0A0F24] text-[#A6E1FA] shadow-lg"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input and Send Icon */}
      <div className="flex mt-4 rounded-lg bg-[#0A0F24] p-1">
        <input
          type="text"
          className="flex-1 p-2 bg-transparent text-white outline-none text-base placeholder-[#A6E1FA] border-none transition-all duration-300"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-transparent text-[#2563EB] hover:text-[#1E40AF] transition-all duration-300 hover:scale-110 flex items-center justify-center"
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
            background: rgba(166, 225, 250, 0.3);
            border-radius: 4px;
          }
          .scrollbar-transparent::-webkit-scrollbar-thumb:hover {
            background: rgba(166, 225, 250, 0.5);
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;