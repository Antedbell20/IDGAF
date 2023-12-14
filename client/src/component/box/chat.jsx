// Chat.js
import React from 'react';

function Chat({ selectedUser }) {
  return (
    <div className="chat-container">
      <div className="left-panel">
        <h2>{selectedUser.username}</h2>
        {/* Add any other user details you want to display */
        }
      </div>
      {/* Add the chat messages and input box here */}
    </div>
  );
}

export default Chat;
