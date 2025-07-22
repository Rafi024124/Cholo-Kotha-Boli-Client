import React from 'react';

import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import UserSidebar from '../components/UserSidebar'; // We'll create this next
import { useChatStore } from '../store/useChatStore.js';




const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Sidebar */}
      <div className="w-full max-w-xs border-r border-[var(--primary-color)] bg-[var(--bg-color)] p-4 overflow-y-auto">
       <UserSidebar></UserSidebar>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
