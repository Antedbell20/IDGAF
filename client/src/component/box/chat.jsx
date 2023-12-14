import React, { useState, useEffect, useRef } from 'react';

function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]); // State to store the list of messages
  const messageListRef = useRef(null); // Ref for scrolling to the bottom of the message list

  useEffect(() => {
    // Scroll to the bottom of the message list when messages change
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // TODO: Implement the logic to listen for incoming messages from selectedUser
  // This would typically involve WebSocket or polling for new messages.

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={messageListRef}>
        {/* Map through messages and display them */}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="right-panel">
        <h2 style={{ backgroundColor: '#3498db', color: 'white' }}>
          {selectedUser.username}
        </h2>
        {/* Additional user details can be added here */}
      </div>
    </div>
  );
}

export default Chat;
