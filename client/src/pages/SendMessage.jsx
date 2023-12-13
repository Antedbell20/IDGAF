import  { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../utils/mutations'; // Make sure to use the correct path

const SendMessage = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage({
        variables: {
          content: message,
          chatId,
        },
      });
      setMessage(''); // Clear the message input after sending
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="send-message-container">
      <form onSubmit={handleSendMessage} className="send-message-form">
        <button type="button" className="attach-button" disabled={loading}>
          📎 {/* Replace with an actual attachment icon */}
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={loading || !chatId}>
          &#9658; {/* Replace with an actual send icon */}
        </button>
      </form>
      {error && <p className="error-message">Could not send message: {error.message}</p>}
      <style jsx>{`
        .send-message-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: #f5f5f5;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        .send-message-form {
          display: flex;
          flex-grow: 1;
          margin: 0 10px;
        }
        .message-input {
          flex-grow: 1;
          margin: 0 10px;
          padding: 10px;
          border-radius: 20px;
          border: 1px solid #ccc;
        }
        .attach-button, .send-button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 50%;
          cursor: pointer;
        }
        .attach-button {
          margin-right: 10px;
        }
        .error-message {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default SendMessage;
