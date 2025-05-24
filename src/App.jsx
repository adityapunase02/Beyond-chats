import React, { useState } from "react";
import ChatbotPanel from "./components/ChatbotPanel";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header with Hamburger */}
      <header className="flex items-center justify-between bg-white px-4 py-2.5 border-b border-gray-100 shadow-sm">
        <button
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          className="text-xl text-white bg-black py-1 px-2.5 rounded-xl transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
        >
          ☰
        </button>
      </header>

      {/* Body */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {isSidebarVisible && (
          <Sidebar
            onClose={() => setIsSidebarVisible(false)}
            selectedChatId={selectedChatId}
            onSelectChat={(id) => setSelectedChatId(id)}
          />
        )}

        {/* Main Content */}
        <MainContent
          isSidebarVisible={isSidebarVisible}
          isChatbotVisible={isChatbotVisible}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
        />
      </div>

      {/* Chatbot Panel (Right) */}
      {isChatbotVisible && (
        <ChatbotPanel onClose={() => setIsChatbotVisible(false)} />
      )}

      {/* Floating Chat Button */}
      {!isChatbotVisible && (
        <button
          onClick={() => setIsChatbotVisible(true)}
          className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg text-2xl"
        >
          💬
        </button>
      )}
    </div>
  );
}

export default App;
