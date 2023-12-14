import React, { useState } from 'react';
import SendMessage from '../component/box/SendMessage'; // Adjust the path as necessary
import ColorPicker from '../component/Colorpicker'; // Adjust the path as necessary
import pic1 from '../../../client/add.png'; // Adjust the path as necessary
import UserList from '../component/box/userList'; // Adjust the path as necessary
import Chat from '../component/box/chat'; // Import your Chat component

const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState('#3498db');
  const [formData, setFormData] = useState({ message: '', search: '' });
  const { message, search } = formData;
  const currentChatId = "507f1f77bcf86cd799439021"; // Replace with your logic
  const [showUserList, setShowUserList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  const handleToggleUserList = () => {
    setShowUserList(!showUserList);
  };

  const handleColorChange = (newColor) => {
    setBackgroundColor(newColor);
  };

  const handleBackgroundChange = () => {
    const changableColorDiv = document.getElementById('changable-color');
    if (changableColorDiv) {
      changableColorDiv.style.backgroundColor = backgroundColor;
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div>
      <div className="top-right">
        <a href="Login">
          <div className="link">LogOut</div>
        </a>
      </div>
      <div className="home-container">
        <div className="left">
          <div className="add">
            <button className="add-btn" onClick={handleToggleUserList}>
              <img src={pic1} alt="add-image" /><p>Add Friend</p>
            </button>
          </div>
          {showUserList && <UserList onUserSelect={setSelectedUser} />}
          <div className="search" id="hide" style={{ display: 'none' }}>
            {/* ... */}
          </div>
        </div>
        <div className="right" id="changable-color">
          <ColorPicker onColorChange={handleColorChange} />
          <button className='change' onClick={handleBackgroundChange}>Change Background</button>
          <SendMessage chatId={currentChatId} />
          {selectedUser && <Chat selectedUser={selectedUser} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
