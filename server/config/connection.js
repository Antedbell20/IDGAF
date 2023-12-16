const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/IDGAF', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(`MongoDB connection error: ${err}`));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB disconnected');
    process.exit(0);
  });
});


module.exports = mongoose.connection;

