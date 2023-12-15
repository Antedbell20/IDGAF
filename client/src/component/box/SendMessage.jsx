import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations'; // Adjust the path as necessary

const SendMessage = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);
  const [sentMessages, setSentMessages] = useState([]); // State to store sent messages

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    try {
      const { data } = await sendMessage({
        variables: {
          content: message,
          chatId,
        },
      });

      // Update the UI state with the sent message
      if (data && data.sendMessage) {
        setSentMessages((prevMessages) => [...prevMessages, data.sendMessage]);
      }

      setMessage(''); // Clear the message input after sending
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div >
      <div className="chat-box">
        {/* Display sent messages */}
        {sentMessages.map((sentMessage) => (
          <div key={sentMessage._id} className="chat-message">
            <div>

            <p className="message">{sentMessage.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="send-message-container">

      <form onSubmit={handleSendMessage} className="send-message-form">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={loading || !chatId}>
          Send
        </button>
      </form>
      {error && <p className="error-message">Could not send message: {error.message}</p>}
    </div>
    </div>
  );
};

export default SendMessage;
