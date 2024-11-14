import React, { useState } from 'react';

const ChatWindow = ({ selectedChat }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="bg-gray-800 w-3/4 p-4 h-full flex flex-col">
      <div className="flex bg-gray-700 rounded-lg p-3 items-center space-x-2 mb-4">
        {selectedChat && (
          <>
            <img
              src={selectedChat.profileImage}
              alt={selectedChat.name}
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-2xl text-white">{selectedChat.name}</h2>
          </>
        )}
      </div>

      <div className="flex-grow overflow-y-auto">
        {/* Chat messages will be displayed here */}
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400 bg-gray-700 text-white"
          value={message}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
