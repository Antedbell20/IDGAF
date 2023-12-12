import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup"
import './index.css';



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
        path: '/Signup',
        element: <Signup/>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
