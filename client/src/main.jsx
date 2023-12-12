import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import Home from './pages/Home';
import Login from "./pages/Login.jsx"
import Singup from "./pages/Singup"



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
 
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/Login',
        element: <Login />
      }, {
        path: '/Singup',
        element: <Singup/>
      },
       {
        path: '/me',
        element: <Profile />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
