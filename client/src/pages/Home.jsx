

const Home = () => {
  const [formData, setFormData] = useState({ message: '', });

  const { message, } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
<<<<<<< HEAD
    <div>
      <p>Hello</p>
=======
    <div className='home-container'>
      <div className='left'>
        <button>Add Friend</button>
      </div>
      <div className='right'>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message"></label>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={handleChange}/>
        </div>
        </form>
      </div>
>>>>>>> 5155147a80a3a1f2975b4867444fb71f8eaebc0d
    </div>
  )
}

export default Home
