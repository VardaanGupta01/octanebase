// components/ChatStylist.jsx
"use client";

import { useState } from "react";

export default function ChatStylist() {
  // 1. Dimaag (States)
  const [messages, setMessages] = useState([
    { role: "ai", text: "Namaste! Main OctaneBase ka AI Stylist hoon. Apni gaadi ka naam aur budget bataiye, main best upgrades suggest karunga!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. Action (Message bhejne ka function)
  const sendMessage = async () => {
    if (!input.trim()) return; // Agar khali message hai toh kuch mat karo

    // Customer ka message list mein add karo
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput(""); // Input box khali kar do
    setIsLoading(true); // AI ko sochne ka time do

    try {
      // Hamare Backend (Manager Room) ko message bhejo
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // AI ka answer list mein add karo
      if (data.reply) {
        setMessages([...newMessages, { role: "ai", text: data.reply }]);
      } else {
        setMessages([...newMessages, { role: "ai", text: "Oops, kuch dikkat aayi. Wapas try karo!" }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: "ai", text: "Network error! Server connection check karo." }]);
    } finally {
      setIsLoading(false); // AI ne soch liya, loading band
    }
  };

  // 3. Design (UI)
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl mx-auto overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-red-600 p-4 text-center font-bold text-lg">
        🤖 OctaneBase AI Stylist
      </div>

      {/* Chat Area */}
      <div className="h-96 p-4 overflow-y-auto flex flex-col gap-4 bg-gray-950">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`max-w-[80%] p-3 rounded-xl ${
              msg.role === "user" 
                ? "bg-gray-800 text-white self-end rounded-br-none" 
                : "bg-red-900/30 border border-red-800 text-gray-200 self-start rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 text-sm self-start animate-pulse">
            Stylist is typing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-900 flex gap-2 border-t border-gray-800">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your car details here..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-red-600 border border-transparent transition-all"
        />
        <button 
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}