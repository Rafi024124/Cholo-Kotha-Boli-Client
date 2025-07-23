import React from 'react';
import { MessageCircleOff } from 'lucide-react';

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10 bg-[#f0fdfa] text-[#134e4a]">
      <MessageCircleOff className="w-16 h-16 text-[#059669] mb-4" />
      <h2 className="text-2xl font-semibold mb-2 text-[#059669]">No Conversation Selected</h2>
      <p className="text-sm max-w-md text-[#3d7966]">
        Please select a user from the sidebar to start chatting. Your messages will appear here.
      </p>
    </div>
  );
};

export default NoChatSelected;
