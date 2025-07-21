import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { UserRound } from 'lucide-react';
import SidebarSkeleton from '../pages/skeletons/SidebarSkeleton';


const UserSidebar = () => {
  const {
    selectedUser,
    setSelectedUser,
    isUserLoading,
    users,
    getUsers,
    
  } = useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log(users);
  

  if (isUserLoading) return <SidebarSkeleton></SidebarSkeleton>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[var(--primary-color)]">
        <UserRound className="w-6 h-6" /> Contacts
      </h2>
      <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-6rem)] pr-1">
        {users.map((user) => (
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
      </ul>
    </div>
  );
};

export default UserSidebar;
