import React, { useState } from 'react';

const Home = () => {
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
    <div className='home-container'>
      <div className='left'>
        <div className='add'>
        <button>Add Friend</button>
        </div>
        <div className='search hide'>
        <form onSubmit={handleSubmit}>
            <div className=''>
              <label htmlFor="search"></label>
              <input
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
  );
};

export default Home;
