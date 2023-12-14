const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 8099;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
  startApolloServer();
// var socket  = require( 'socket.io' );
// var express = require('express');
// var app     = express();
// var server  = require('http').createServer(app);
// var io      = socket.listen( server );
// var port    = process.env.PORT || 3000;

// server.listen(port, function () {
//   console.log('Server listening at port %d', port);
// });


// io.on('connection', function (socket) {

//   socket.on( 'new_count_message', function( data ) {
//     io.sockets.emit( 'new_count_message', { 
//     	new_count_message: data.new_count_message

//     });
//   });

//   socket.on( 'update_count_message', function( data ) {
//     io.sockets.emit( 'update_count_message', {
//     	update_count_message: data.update_count_message 
//     });
//   });

//   socket.on( 'new_message', function( data ) {
//     io.sockets.emit( 'new_message', {
//     	name: data.name,
//     	email: data.email,
//     	subject: data.subject,
//     	created_at: data.created_at,
//     	id: data.id
//     });
//   });

  
// });