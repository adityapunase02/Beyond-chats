import React, { useState } from "react";
import { chatData } from "../data/chatData";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

export default function Sidebar({ onClose, onSelectChat, selectedChatId }) {
  const [sortBy, setSortBy] = useState("time");

  const statusOrder = {
    unread: 0,
    read: 1,
    blocked: 2,
  };

  const sortedChats = [...chatData].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "status") {
      return statusOrder[a.status] - statusOrder[b.status];
    } else {
      return new Date(b.time) - new Date(a.time);
    }
  });

  const getStatusDotColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-yellow-400";
      case "read":
        return "bg-green-500";
      case "blocked":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-white text-black shadow-lg z-40 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3.5 border-b border-gray-100">
        <h2 className="text-lg font-semibold">Your Inbox</h2>
        <button
          onClick={onClose}
          className="text-sm bg-black text-white px-1 py-1 w-auto rounded-lg transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
        >
          <CloseFullscreenIcon />
        </button>
      </div>

      {/* Sort Dropdown and Chat Count */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div>
          <label htmlFor="sort" className="text-sm text-gray-700 mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-100 text-black w-[80px] rounded-2xl px-2 py-1 text-sm"
          >
            <option value="time">Time</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
        <span className="text-sm text-green-400">{chatData.length} chats</span>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1 px-2 pb-4 space-y-2">
        {sortedChats.map((chat) => {
          const isSelected = selectedChatId === chat.id;
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition ${
                isSelected ? "bg-blue-600/30" : "hover:bg-blue-600/20"
              }`}
            >
              <img
                src={chat.profilePic}
                alt="avatar"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm truncate">
                    {chat.name}
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusDotColor(
                      chat.status
                    )}`}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 truncate">
                  {chat.company}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-800 truncate w-40">
                    {chat.message}
                  </div>
                  <div className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {new Date(chat.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
