import React from 'react';
import { MessageCircleOff } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10 text-[var(--text-color)] bg-[var(--bg-color)]">
      <MessageCircleOff className="w-16 h-16 text-[var(--primary-color)] mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No Conversation Selected</h2>
      <p className="text-sm max-w-md">
        Please select a user from the sidebar to start chatting. Your messages will appear here.
      </p>
    </div>
  );
};

export default NoChatSelected;
