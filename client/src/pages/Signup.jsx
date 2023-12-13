import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = formState; // Destructure for use in inputs

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  if (data) {
    return (
      <p>
        Success! You may now head <Link to="/">back to the homepage.</Link>
      </p>
    );
  }

  return (
    <div className='body'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h1>SignUp</h1>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
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
            <Link to="/login">Login Instead</Link>
          </div>

          {error && <p>Error: {error.message}</p>}

          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
