import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
// import Search from "./pages/Search"; // Ensure the import is correct
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/Signup',
        element: <Signup />
      },
      // {
      //   path: '/search', // Updated path for the search page
      //   element: <Search />
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
