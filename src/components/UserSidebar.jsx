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

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="
  bg-[#ecfdfa] text-[#134e4a] shadow-sm border border-[#a7f3d0]
  h-full flex flex-col overflow-hidden  overflow-x-hidden
  w-16 md:w-64 min-w-0
">
      {/* Header: only visible on md and up */}
      <h2 className="hidden md:flex text-xl font-bold mb-4 px-4 py-5 items-center gap-2 text-[#059669] border-b border-[#a7f3d0]">
        <UserRound className="w-6 h-6" /> Contacts
      </h2>

      {/* Checkbox & online count: hide on small screens */}
      <div className="hidden md:flex mb-4 px-4 items-center gap-2 text-sm text-[#3d7966]">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="accent-[#059669] w-4 h-4"
          />
          Show online only
        </label>
        <span className="text-xs text-[#2f6d5a]">({onlineUsers.length - 1} online)</span>
      </div>

      {/* User list container */}
      <ul
  className="
    flex flex-col
    md:block
    overflow-y-auto
    overflow-x-hidden
    max-h-[calc(100vh-9rem)]
    pr-1
    custom-scroll
    w-full
    md:w-auto
+   min-w-0
  "
>
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
          <li
  key={user._id}
  onClick={() => setSelectedUser(user)}
  className={`
    cursor-pointer
    transition-all
    border
    rounded-xl
    flex
    items-center
    gap-3
    p-3
    md:p-3
    md:flex-row
    flex-col
    md:hover:bg-[#a7f3d0]
    md:border-transparent
    md:${isSelected ? 'bg-[#d1fae5] border-[#6ee7b7]' : ''}
    justify-center
    md:justify-start

    ${isSelected ? 'bg-[#d1fae5] border-[#6ee7b7]' : 'border-transparent'}

    w-16
    md:w-auto
+   min-w-0
  `}
>

              <div className="relative">
                <img
                  src={user.profilePic || '/avatar.jpg'}
                  alt={user.fullName}
                  className={`w-11 h-11 rounded-full object-cover border-2 border-[#6ee7b7] shadow-sm`}
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#34d399] border-2 border-[#ecfdfa] rounded-full" />
                )}
              </div>

              {/* Name & status only on md and above */}
              <div className="hidden md:flex flex-col">
                <span className="font-semibold text-[#134e4a]">{user.fullName}</span>
                <span className="text-xs text-[#3d7966]">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </li>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-[#2f6d5a] py-4">No users found</div>
        )}
      </ul>
    </aside>
  );
};

export default UserSidebar;
