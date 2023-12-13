
import React, { useState } from 'react';
import SendMessage from "../pages/SendMessage"; // Correct the import if SendMessage is a default export



  // This should be the chat ID the user is currently in
  // Replace with your logic to get the current chat ID
  const currentChatId = "507f1f77bcf86cd799439021";

import pic1 from '../../../client/add.png';
import { useState } from 'react';
import ColorPicker from '../component/Colorpicker';

const Home = ({ backgroundColor, onColorChange, onButtonClick }) => {
  const handleButtonClick = () => {
    const hideElement = document.getElementById('hide');
    if (hideElement) {
      hideElement.style.display = hideElement.style.display === 'none' ? 'block' : 'none';
    }
  };

  const handleBackgroundChange = () => {
    const changableColorDiv = document.getElementById('changable-color');
    if (changableColorDiv) {
      changableColorDiv.style.backgroundColor = backgroundColor;
    }
  };

  const [formData, setFormData] = useState({ message: '', search: '' });


  const handleAddFriendClick = () => {
    // Logic to add a friend
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the search
  };

  return (
    <div>
        <div className="top-right">

          <a href="/login">
            <div className="link">LogOut</div>
          </a>
        </div>
      </nav>
      <div className='home-container'>
        <div className='left'>
          <div className='add'>
            <button className='add-btn' onClick={handleAddFriendClick}>
              <img src={pic1} alt="Add Friend" /> <p>Add Friend</p>
            </button>
          </div>
          <div className='search'>
            <form onSubmit={handleSearchSubmit}>
              <div className='search-box'>
                <input
                  placeholder='Username'

                  type="text"
                  id="search"
                  name="search"
                  value={search}

                  onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className='right'>
          <SendMessage chatId={currentChatId} />
        </div>

                  onChange={handleChange}
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
        <div className="right" id="changable-color">
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
