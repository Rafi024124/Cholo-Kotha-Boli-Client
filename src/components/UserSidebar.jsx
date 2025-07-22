import React, { useEffect, useState } from 'react';

import { UserRound } from 'lucide-react';
import SidebarSkeleton from '../pages/skeletons/SidebarSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore.js';


const UserSidebar = () => {
  const {
    selectedUser,
    setSelectedUser,
    isUserLoading,
    users,
    getUsers,
    
  } = useChatStore();

  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter(user=> onlineUsers.includes(user._id)) : users;
  

  if (isUserLoading) return <SidebarSkeleton></SidebarSkeleton>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[var(--primary-color)]">
        <UserRound className="w-6 h-6" /> Contacts
      </h2>
      <div className='mt-3 hidden lg:flex items-center gap-2'>
        <label className='cursor-pointer flex items-center gap-2'>
          <input type="checkbox"
          checked={showOnlineOnly}
          onChange={(e)=> setShowOnlineOnly(e.target.checked)}
          className='checkbox checkbox-sm' />
          <span className='text-sm'>Show online only</span>
        </label>
        <span className='text-xs text-zinc-500'>({onlineUsers.length - 1} online)</span>
       
      </div>
      <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-6rem)] pr-1">
        {filteredUsers.map((user) => (
          <li
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
              selectedUser?._id === user._id
                ? 'bg-[var(--primary-color)]/20'
                : 'hover:bg-[var(--primary-color)]/10'
            }`}
          >
            <img
              src={user.profilePic || "/avatar.jpg"}
              alt={user.fullName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[var(--text-color)]">{user.fullName}</span>
              <span className="text-sm text-[var(--text-color)]/70">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-400">Online</span>
                ) : (
                  <span className="text-gray-400">Offline</span>
                )}
              </span>
            </div>
          </li>


        

        ))}
        {filteredUsers.length === 0 && (
          <div className='text-center text-zinc-500 py-4'>No online users</div>
        )}
      </ul>
    </div>
  );
};

export default UserSidebar;
