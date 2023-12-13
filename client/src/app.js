import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import Box from './App/Box';
function App(){
    
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setSocket(io('http://localhost:4000'));
    
    }, []);
    function handleForm(e) {
        e.preventDefault();
        console.log(messages);
    }
    return <div>
        Hi
        <Box component="form" onsubmit={handleForm}>
        <TextField size='small' id="standard-basic" label="Standard" variant="standard"value={messages} onChange={(e) => setMessages(e.target.value)} />
        <Button variant='text' type="submit">text</Button>
        </Box>
    </div>;
}
export default App;