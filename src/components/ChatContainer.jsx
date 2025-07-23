import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "../pages/skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="bg-[#d1fae5] h-full flex flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div
      className="flex-1 flex flex-col overflow-hidden h-full text-[#134e4a]"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
        zIndex: 0,
      }}
    >
      <ChatHeader />

      <div
        className="
          flex-1
          overflow-y-auto
          p-4
          space-y-4
          scrollbar-thin scrollbar-thumb-emerald-300 scrollbar-track-emerald-100
          max-h-[calc(100vh-12rem)] sm:max-h-[calc(100vh-10rem)]
          bg-[#d1fae5]/80
          "
      >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border border-emerald-400 shadow-sm">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.jpg"
                      : selectedUser.profilePic || "/avatar.jpg"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1 text-xs text-emerald-700 opacity-80">
              <time className="ml-1">{formatMessageTime(message.createdAt)}</time>
            </div>
            <div
              className={`chat-bubble flex flex-col text-sm rounded-lg shadow-sm px-3 py-2 max-w-[80vw] sm:max-w-[60vw] ${
                message.senderId === authUser._id
                  ? "bg-emerald-900 text-emerald-100"
                  : "bg-white text-[#134e4a]"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="pic"
                  className="sm:max-w-[200px] rounded-md mb-2 border border-emerald-200"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
