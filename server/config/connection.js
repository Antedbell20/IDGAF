const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/IDGAF');

const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event listener for connection error
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Event listener for disconnected
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;

