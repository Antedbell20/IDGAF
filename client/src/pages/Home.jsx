import React, { useState } from 'react';
import ColorPicker from '../component/Colorpicker';
import pic1 from '../../../client/add.png'; // Adjust the path based on your project structure

const Home = ({ onButtonClick }) => {
  const [backgroundColor, setBackgroundColor] = useState('#3498db');
  const [formData, setFormData] = useState({ message: '', search: '' });

  const { message, search } = formData;

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
          <div className="link">
            LogOut
          </div>
        </a>
      </div>
      <div className="home-container">
        <div className="left">
          <div className="add">
            <button className="add-btn" onClick={handleButtonClick}>
              <img src={pic1} alt="add-image" /> <p>Add Friend</p>
            </button>
          </div>
          <div className="search" id="hide">
            <form onSubmit={handleSubmit}>
              <div className="search-box">
                <label htmlFor="search"></label>
                <input
                  placeholder="Username"
                  type="text"
                  id="search"
                  name="search"
                  value={search}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <div className="right" id="changable-color">
        <ColorPicker onColorChange={handleColorChange} />
          <button className='change' onClick={handleBackgroundChange}>Change Background</button>
          <div className="text-box">
            <form onSubmit={handleSubmit}>
              <div className="text-area">
                <label htmlFor="message"></label>
                <input
                  placeholder="Message..."
                  type="text"
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
