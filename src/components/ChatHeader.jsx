import React from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore';
import { XCircle } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex items-center justify-between bg-[#d1fae5] text-[#065f46] px-4 py-2 shadow-sm border-b border-emerald-200 rounded-t-lg">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePic || "/avatar.jpg"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover border border-emerald-300"
        />
        <div>
          <h2 className="font-semibold">{selectedUser.fullName}</h2>
          <p className={`text-sm ${isOnline ? 'text-emerald-600' : 'text-gray-500'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="text-red-400 hover:text-red-600 transition-colors"
        title="Close Chat"
      >
        <XCircle size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
