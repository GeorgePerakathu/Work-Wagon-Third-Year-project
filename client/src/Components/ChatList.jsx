
import React from 'react';

const ChatList = ({ contacts, onSelectChat }) => {
  return (
    <div className="bg-gray-900 w-1/4 p-4 h-full overflow-y-auto">
      <h2 className="text-2xl text-white mb-4">Chats</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            onClick={() => onSelectChat(contact)}
            className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-800 rounded-lg"
          >
            <img
              src={contact.profileImage}
              alt={contact.name}
              className="w-10 h-10 rounded-full"
            />
            <p className="text-white">{contact.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
