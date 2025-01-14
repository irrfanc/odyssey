"use client";

import { generateChatResponse } from "@/utils/action";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaPaperPlane, FaTrash } from "react-icons/fa";
import TypingIndicator from "./TypingIndicator";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputPosition, setInputPosition] = useState("center");
  const [placeholder, setPlaceholder] = useState("");
  const messageEndRef = useRef(null);
  const typingRef = useRef(null);

  const placeholders = [
    "Plan a 3-day trip to Paris.",
    "Suggest a budget tour in Japan.",
    "Plan a cultural trip to Athens.",
    "Must-visit attractions in Rome?",
    "What to do in London for 2 days?",
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;

    const startTyping = () => {
      typingRef.current = setInterval(() => {
        if (charIndex < placeholders[currentIndex].length) {
          setPlaceholder((prev) =>
            placeholders[currentIndex].substring(0, charIndex + 1)
          );
          charIndex++;
        } else {
          clearInterval(typingRef.current);
          setTimeout(() => {
            charIndex = 0;
            currentIndex = (currentIndex + 1) % placeholders.length;
            startTyping();
          }, 2000);
        }
      }, 100);
    };

    startTyping();

    return () => clearInterval(typingRef.current);
  }, []);

  const stopPlaceholderTyping = () => {
    clearInterval(typingRef.current);
    setPlaceholder("");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data || !data.content) {
        toast.error("Something went wrong...");
        return;
      }

      let tempMessage = "";
      let i = 0;

      const interval = setInterval(() => {
        if (i < data.content.length) {
          tempMessage += data.content[i];
          setMessages((prev) => {
            const updated = [...prev];
            if (updated[updated.length - 1]?.role === "assistant") {
              updated[updated.length - 1].content = tempMessage;
            } else {
              updated.push({
                role: "assistant",
                content: tempMessage,
                date: new Date().toLocaleTimeString(),
              });
            }
            return updated;
          });
          i++;
        } else {
          clearInterval(interval);
        }
      }, 15);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const query = { role: "user", content: text, date: new Date().toLocaleTimeString() };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
    setInputPosition("bottom");
    stopPlaceholderTyping();
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPending]);

  const clearMessages = () => {
    setMessages([]);
    toast.success("Chat cleared!");
    setInputPosition("center");
    stopPlaceholderTyping();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-sans relative">
      {/* Header */}
      <div className="sticky top-0 z-10 p-4 flex justify-between items-center bg-gray-900 bg-opacity-75 backdrop-blur-md">
        <h1
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-text tracking-wide flex items-center"
        >
          Chat with Odyssey
          <span className="ml-2 flex">
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={index}
                className="inline-block w-2 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mx-[1px] animate-typing mt-4"
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
              ></span>
            ))}
          </span>
        </h1>
        {messages.length > 0 && (
        <button
            onClick={clearMessages}
            className="md:hidden mr-14 mt-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all shadow-md 
            fixed top-4 right-4 md:relative md:top-auto md:right-auto"
          >
            <FaTrash size={16} />
          </button> )}
        
      </div>

      {/* Chat Area */}
      <div
        className={`flex-grow p-6 space-y-4 overflow-y-auto ${
          inputPosition === "center" ? "pb-40" : "pb-24"
        }`}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center space-y-4 mt-20">
            <p className="text-xl font-light text-gray-400">
              Plan your perfect trip with Odyssey! Start by typing below.
            </p>
          </div>
        ) : (
          messages.map(({ role, content, date }, index) => (
            <div
              key={index}
              className={`flex ${
                role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 max-w-md rounded-lg shadow-md ${
                  role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                    : "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-100"
                }`}
              >
                <p className="text-base leading-relaxed font-medium">
                  {content}
                </p>
                <span className="text-xs text-gray-400 mt-2 block">{date}</span>
              </div>
            </div>
          ))
        )}
        {isPending && <TypingIndicator />}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className={`transition-all duration-500 ${
          inputPosition === "center"
            ? "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-gray-800 bg-opacity-80 backdrop-blur-md border rounded-full shadow-lg flex items-center px-6 py-3"
            : "fixed left-1/2 bottom-4 transform -translate-x-1/2 w-11/12 max-w-3xl bg-gray-800 bg-opacity-80 backdrop-blur-md border rounded-full shadow-lg flex items-center px-6 py-3"
        }`}
      >
        <input
          type="text"
          placeholder={placeholder}
          className="flex-grow bg-transparent text-lg placeholder-gray-400 focus:outline-none text-gray-100"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="ml-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full transition-all shadow-md"
          disabled={isPending}
        >
          {isPending ? "Sending..." : <FaPaperPlane />}
        </button>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="hidden md:block bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all shadow-md 
            fixed top-4 right-4 md:relative md:top-auto md:right-auto ml-2"
          >
            <FaTrash size={16} />
          </button>
        )}
      </form>
    </div>
  );
};

export default Chat;
