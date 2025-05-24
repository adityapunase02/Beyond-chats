import React from "react";
import { chatData } from "../data/chatData";
import { formatDistanceToNow } from "date-fns";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BlindsClosedIcon from "@mui/icons-material/BlindsClosed";
import BoltIcon from "@mui/icons-material/Bolt";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const MainContent = ({
  isSidebarVisible,
  isChatbotVisible,
  selectedChatId,
  setSelectedChatId,
}) => {
  const selectedChat = chatData.find((chat) => chat.id === selectedChatId);

  const containerClasses = [
    "transition-all duration-300 ease-in-out flex-1 flex flex-col bg-white",
    isSidebarVisible ? "ml-72" : "ml-0",
    isChatbotVisible ? "mr-80" : "mr-0",
  ].join(" ");

  return (
    <div className={containerClasses}>
      <div className="flex-1 p-6 overflow-y-auto">
        {!selectedChat ? (
          <>
            <h2 className="text-xl font-medium mb-4">Welcome Back</h2>
            <p className="text-lg">Click on any chat to view it</p>
          </>
        ) : (
          <div className="space-y-4">
            {/* Header Row */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              {/* Chat Title */}
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedChat.name}
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="text-sm bg-gray-200 px-1 py-1 rounded-lg hover:bg-gray-300 transition">
                  <MoreHorizIcon />
                </button>
                <button className="text-sm bg-gray-200 px-1 py-1 rounded-lg hover:bg-gray-300 transition">
                  <ModeNightIcon />
                </button>
                <button
                  onClick={() => setSelectedChatId(null)}
                  className="text-sm text-white bg-black px-3 py-1 rounded-lg hover:bg-gray-300 hover:text-black transition flex items-center gap-1"
                >
                  <BlindsClosedIcon fontSize="medium" />
                  Close
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            {selectedChat.conversation.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[70%] ${
                  msg.fromMe ? "ml-auto items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-xl px-4 py-2 text-sm ${
                    msg.fromMe
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.status} •{" "}
                  {formatDistanceToNow(new Date(msg.time), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="sticky bottom-0 bg-white shadow-md p-4 flex items-center gap-1 z-10">
        {/* Placeholder Icons */}
        <button className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition">
          <BoltIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition">
          <TurnedInIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition">
          <EmojiEmotionsIcon />
        </button>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          disabled
        />

        {/* Send Button */}
        <button
          className="bg-gray-950 text-white px-4 py-2 rounded-full hover:bg-gray-700 active:scale-95 transition"
          disabled
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MainContent;
