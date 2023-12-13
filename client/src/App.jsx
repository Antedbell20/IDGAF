// src/App.js

import React, { useState } from 'react';
import Home from './pages/Home';
import Navbar from './component/Navbar';
import ColorPicker from './component/Colorpicker';
import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#3498db');

  const handleColorChange = (newColor) => {
    setBackgroundColor(newColor);
  };

  const handleBackgroundChange = () => {
    setBackgroundColor(backgroundColor);
  };

  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <Navbar />
        <ColorPicker onColorChange={handleColorChange} />
        <Home
          backgroundColor={backgroundColor}
          onButtonClick={handleBackgroundChange}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;