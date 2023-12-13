import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { io } from "socket.io-client";

function App(){
    
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    
    }, []);
    return <div>
        Hi
        <Button variant='text'>text</Button>
    </div>;
}
export default App;