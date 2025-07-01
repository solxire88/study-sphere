
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import { Send } from "lucide-react";
import { ACCESS_TOKEN } from "../../constants";
import "katex/dist/katex.min.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hey! I’m **StudyBuddy**, your personal learning partner.  
Whether you’re stuck on a tricky problem, prepping for an exam, or exploring a new topic, just ask away!  
I’ll walk you through concepts step-by-step, give you examples, and cheer you on along the way!`,
      sender: "system",
      time: "10:00 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef(null);
  const pendingRef = useRef(new Set());
  const messagesEndRef = useRef(null);

  // auto-scroll on new messages or typing indicator
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // initialize WebSocket
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      console.error("No access token—please log in.");
      return;
    }
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chatbot/?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => console.log("Connected to StudyBuddy");
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);

      if (data.typing) {
        setIsTyping(true);
        return;
      }

      setIsTyping(false);
      const text = data.message || "";
      if (pendingRef.current.has(text)) {
        pendingRef.current.delete(text);
        return;
      }
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text, sender: "chatbot", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    };
    ws.onerror = (err) => console.error("WebSocket error", err);
    ws.onclose = () => console.log("Disconnected from StudyBuddy");
    return () => ws.close();
  }, []);

  // send user message
  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || !socketRef.current) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { id: prev.length + 1, text, sender: 'user', time }]);

    socketRef.current.send(JSON.stringify({ message: text, emitTyping: true }));
    pendingRef.current.add(text);
    setIsTyping(true);
    setInput("");
  }, [input]);

  return (
    <div className="max-w-xl mx-auto mt-4">
      <div className="bg-[#0A0F24] border border-[#1E2A47] p-4 rounded-2xl text-white max-h-64 overflow-y-auto scrollbar-transparent">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          const label = isUser ? 'You' : 'StudyBuddy';
          const bubbleClass = isUser
            ? 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white'
            : 'bg-gradient-to-r from-[#1E2A47] to-[#0A0F24] text-[#A6E1FA]';

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-full p-3 rounded-lg text-sm ${bubbleClass}`}>
                <div className="text-xs mb-1 text-[#A6E1FA]">{label} · {msg.time}</div>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSanitize]}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="max-w-3/4 p-3 rounded-lg bg-gradient-to-r from-[#1E2A47] to-[#0A0F24] text-[#A6E1FA] text-sm flex items-center">
              <span className="h-2 w-2 bg-white rounded-full animate-ping mr-1" />
              <span className="h-2 w-2 bg-white rounded-full animate-ping animation-delay-200ms mr-1" />
              <span className="h-2 w-2 bg-white rounded-full animate-ping animation-delay-400ms" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex mt-4 bg-[#0A0F24] p-1 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 bg-transparent text-white outline-none placeholder-[#A6E1FA]"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="p-2 text-[#2563EB] hover:text-[#1E40AF]">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
