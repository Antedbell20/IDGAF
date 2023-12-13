import React, { useState } from 'react';
import SendMessage from "../pages/SendMessage"; // Correct the import if SendMessage is a default export
import pic1 from '../../../client/add.png';

const Home = () => {
  const [search, setSearch] = useState('');

  // This should be the chat ID the user is currently in
  // Replace with your logic to get the current chat ID
  const currentChatId = "507f1f77bcf86cd799439021";

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
      <nav>
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
      </div>
    </div>
  );
};

export default Home;
