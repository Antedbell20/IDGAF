import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './component/Navbar';

function App() {
  return (
    <div className="bucket-app">
      <Navbar/>
          <Outlet />
    </div>
  );
}

export default App;