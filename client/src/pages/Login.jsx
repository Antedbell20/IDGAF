import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <div>
    <div className='body'>
      <div className="card-body">
         {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <>
      <form  className= "login-form"onSubmit={handleFormSubmit}>
      <h1>Login</h1>
      <div className='form-container'>
        <div>
          <label htmlFor="email">Email:</label>
          <input
           placeholder="example@email.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
             placeholder="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
          />
          
        </div>

        <button type="submit">Submit</button>
        <a href="Signup"> SignUp Instead</a>
        </div>
      </form>
          {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </div>
  );
};
export default Login;
