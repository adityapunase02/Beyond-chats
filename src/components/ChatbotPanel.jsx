import React, { useState, useEffect } from "react";
import axios from "axios";
import { demoQuestions } from "../data/demoQuestions";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export default function ChatbotPanel({ onClose }) {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessage = { text: message, fromMe: true };
    setChatHistory((prev) => [...prev, newMessage]);
    setUserInput("");
    setIsLoading(true);
    setShowLogo(false);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${OPENAI_API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }
      );

      const botMessage = {
        text:
          response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response received.",
        fromMe: false,
      };

      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          text: "Sorry, something went wrong. Please try again later.",
          fromMe: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      if (!lastMessage.fromMe) {
        setShowLogo(false);
      }
    }
  }, [chatHistory]);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-gray-100 border-l border-gray-200 shadow-lg z-50 flex flex-col">
      <div className="flex justify-between items-center p-3.5 border-b border-gray-300">
        <div className="flex gap-2">
          <button className="bg-transparent text-black font-semibold text-sm rounded-full px-4 py-2 hover:bg-black hover:text-white hover:brightness-110 hover:scale-105 transition-all ">
            AI Copilot
          </button>
          <button className="bg-transparent text-black font-semibold text-sm rounded-full px-4 py-2 hover:bg-black hover:text-white hover:brightness-110 hover:scale-105 transition-all">
            Details
          </button>
        </div>
        <button onClick={onClose} className="text-xl font-bold text-gray-900">
          <ExitToAppIcon />
        </button>
      </div>

      {showLogo && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <img
              src="interlogo.png"
              alt="Gemini Logo"
              className="w-24 h-24 mt-11 mx-auto"
            />
            <p className="text-sm font-medium text-black mt-0">
              Hii, I'm Fin AI Copilot
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.fromMe ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded-xl px-4 py-2 text-sm ${
                  msg.fromMe
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-300">
        <div className="flex gap-2 flex-wrap">
          {demoQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className="bg-gray-200 text-black px-3 py-1 rounded-full text-xs"
            >
              {question}
            </button>
          ))}
        </div>
        <div className="mt-2 flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(userInput)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg"
            placeholder="Ask me anything..."
          />
          <button
            onClick={() => handleSendMessage(userInput)}
            className="bg-black text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
