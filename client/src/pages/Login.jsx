import React, { useState } from 'react';


const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

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
    <div className='body'>
      
      <form  className= "login-form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className='form-container'>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          
        </div>

        <button type="submit">Submit</button>
        <a href="Signup"> SignUp Instead</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
