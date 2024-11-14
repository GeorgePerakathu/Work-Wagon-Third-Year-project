import React, { useState } from 'react';
import ChatList from '../Components/ChatList';
import ChatWindow from '../Components/ChatWindow';
import image1 from '../assets/image1.png';
import SecNav from './SecNav';

const contacts = [
  {
    id: 1,
    name: "Customer 1",
    profileImage: image1,
  },
  {
    id: 2,
    name: "Customer 2",
    profileImage: image1,
  },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (contact) => {
    setSelectedChat(contact);
  };

  return (
    <>
    <SecNav />     
    <div className="App">
    <div className="AppGlass">
    <div className=" bg-gray-900 flex">
      <ChatList contacts={contacts} onSelectChat={handleSelectChat} />
      <ChatWindow selectedChat={selectedChat} />
    </div>
    </div>
    </div>
    </>
  );
};

export default ChatPage;
