import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from '../pages/skeletons/MessageSkeleton';

const ChatContainer = () => {

    const {messages, getMessages, isMessageLoading, selectedUser} = useChatStore()


  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])


  

  if(isMessageLoading) return (
    <div>
        <ChatHeader></ChatHeader>
        <MessageSkeleton></MessageSkeleton>
        <MessageInput></MessageInput>
    </div>
  )
  else{
 return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader></ChatHeader>

            <p>messages...</p>
            <MessageInput></MessageInput>
            
        </div>
    );
  }

   
};

export default ChatContainer;