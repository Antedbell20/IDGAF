import pic1 from '../../../client/add.png'

import React, { useState } from 'react';

const Home = () => {

const handleButtonClick = () => {
  const hideElement = document.getElementById('hide');
  if (hideElement) {
    hideElement.style.display = (hideElement.style.display === 'none') ? 'block' : 'none';
  }
};

  const [formData, setFormData] = useState({ message: '', search: '', });

  const { message, search } = formData;

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
      <nav>
        <div class="top-right">
          <a href="Login">
            <div class="link">
                LogOut
            </div>
          </a>
        </div>
        </nav>
    <div className='home-container'>
      <div className='left'>
        <div className='add'>
        <button className='add-btn' onClick={handleButtonClick}> <img src={pic1} alt="add-image" /> Add Friend</button>
        </div>
        <div className='search' id="hide">
        <form onSubmit={handleSubmit}>
            <div className='search-box'>
              <label htmlFor="search"></label>
              <input
                placeholder='Username'
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
      <div className='right'>
        <div className='text-box'>
          <form onSubmit={handleSubmit}>
            <div className='text-area'>
              <label htmlFor="message"></label>
              <input
                placeholder=' Message...'
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
