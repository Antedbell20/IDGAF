import React, { useState } from 'react';
import SendMessage from '../component/box/SendMessage'; // Adjust the path as necessary
import ColorPicker from '../component/Colorpicker'; // Adjust the path as necessary
import pic1 from '../../../client/add.png'; // Adjust the path as necessary

const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState('#3498db');
  const [formData, setFormData] = useState({ message: '', search: '' });
  const { message, search } = formData;
  const currentChatId = "507f1f77bcf86cd799439021"; // Replace with your logic

  const handleColorChange = (newColor) => {
    setBackgroundColor(newColor);
  };

  const handleBackgroundChange = () => {
    const changableColorDiv = document.getElementById('changable-color');
    if (changableColorDiv) {
      changableColorDiv.style.backgroundColor = backgroundColor;
    }
  };

  const handleButtonClick = () => {
    const hideElement = document.getElementById('hide');
    if (hideElement) {
      hideElement.style.display = hideElement.style.display === 'none' ? 'block' : 'none';
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
            <button className="add-btn" onClick={handleButtonClick}>
              <img src={pic1} alt="add-image" /> <p>Add Friend</p>
            </button>
          </div>
          <div className="search" id="hide" style={{ display: 'none' }}>
            <form onSubmit={handleSubmit}>
              <div className="search-box">
                <input
                  placeholder="Username"
                  type="text"
                  id="search"
                  name="search"
                  value={search}
                  onChange={handleChange}
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="right" id="changable-color">
          <ColorPicker onColorChange={handleColorChange} />
          <button className='change' onClick={handleBackgroundChange}>Change Background</button>
          <SendMessage chatId={currentChatId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
