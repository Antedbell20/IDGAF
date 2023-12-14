import React from 'react';

// This component will receive an array of message objects as a prop
const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="message-list-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message-item ${message.senderId === currentUserId ? 'sent' : 'received'}`}
        >
          <div className="message-content">{message.content}</div>
          <div className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
