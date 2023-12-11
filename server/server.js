const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

// Import your GraphQL type definitions and resolvers
const { typeDefs, resolvers } = require('./schemas');

// Import your database connection
const db = require('./config/connection');

const routes = require('./routes');


const PORT = process.env.PORT || 3001;
const app = express();

// Create an HTTP server and integrate Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  // Socket.IO options here
  cors: {
    origin: '*', // Update this to match your front-end URL in production
    methods: ["GET", "POST"]
  }
});

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors()); // Enable CORS
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
    app.use(routes);

  // Apollo Server as middleware
  app.use('/graphql', expressMiddleware(server));



  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Socket.IO for real-time communication
  io.on('connection', (socket) => {
    console.log('a user connected');

    // event listener
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // Start the server
  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
