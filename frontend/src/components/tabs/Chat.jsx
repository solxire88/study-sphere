"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send } from 'lucide-react';
import { ACCESS_TOKEN, USERNAME } from "../../constants";
import { formatTime } from "../../utils/formatTime";

const Chat = ({ classId }) => {
  const currentUsername = localStorage.getItem(USERNAME);
  console.log(currentUsername);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const pendingRef = useRef(new Set());

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize WebSocket once when classId changes
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.error("No access token found, please log in.");
      return;
    }

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${classId}/?token=${token}`
    );
    socketRef.current = ws;

    ws.onopen = () => console.log("Connected to group chat");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // initial history as array
      if (Array.isArray(data)) {
        setMessages(data.map((m, i) => ({ id: i + 1, text: m.message, sender: m.sender, time: formatTime(m.time) })));
        return;
      }

      const { sender, message, time } = data;
      // ignore echo of our own message
      if (pendingRef.current.has(message)) {
        pendingRef.current.delete(message);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: message, sender, time: formatTime(time) }
      ]);
    };
    ws.onclose = () => console.log("Disconnected from group chat");
    ws.onerror = (err) => console.error("WebSocket error", err);

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [classId]);

  // Send a message over WebSocket
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!socketRef.current || !text) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    // optimistic render
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text, sender: currentUsername, time }
    ]);
    pendingRef.current.add(text);
    socketRef.current.send(JSON.stringify({ message: text }));
    setInput("");
  }, [input, currentUsername]);

  return (
    <div className="max-w-xl w-full mx-auto mt-4">
      <div className="bg-[#04091C] border border-white border-opacity-20 backdrop-blur-md p-4 rounded-2xl shadow-md text-white">
        <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-transparent flex flex-col">
          {messages.map((msg) => {
            const isMe = msg.sender === currentUsername;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>                
                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`} style={{ maxWidth: "75%" }}>
                  <div className={`text-xs text-gray-400 mb-1 ${isMe ? "text-right" : "text-left"}`}>
                    {isMe ? "You" : msg.sender} · {msg.time}
                  </div>
                  <div className={`p-2 rounded-lg text-sm ${isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>                    
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex mt-4 border border-blue-500 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 bg-transparent text-white outline-none text-base placeholder-gray-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="p-2 bg-transparent text-blue-500 hover:text-blue-400 transition flex items-center justify-center">
          <Send className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        .scrollbar-transparent::-webkit-scrollbar { width: 8px; }
        .scrollbar-transparent::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-transparent::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 4px; }
        .scrollbar-transparent::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
      `}</style>
    </div>
  );
};

export default Chat;
