import './App.css';
import BucketList from './components/BucketList';
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