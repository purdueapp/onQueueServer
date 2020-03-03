// Setup basic express server
const express = require('express');
const cors = require('cors');
let cookieParser = require('cookie-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 7374;
require('dotenv').config();

// Routing
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

// HTTP server listen
http.listen(port, function(){
  console.log('Server listening at port %d', port);
});

// HTML file for testing
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// Handle event for creating a room
function createRoom(packet) {

}

// Handle event for joining a room
function joinRoom(packet) {

}

// Fired upon connection with client
io.on('connection', function(socket) {
  console.log('User connected');

  socket.on('create room', createRoom);
  socket.on('join room', joinRoom);

  // // Listen to 'chat message' event from client
  // socket.on('chat message', function(msg){
  //   console.log('message: ' + msg);
  //   // send a message to everyone except for a certain emitting socket
  //   socket.broadcast.emit('Message was recieved.');
  //   // send the message to everyone, including the sender
  //   io.emit('chat message', msg);
  // });
  // // Each socket fires a 'disconnect' event as well
  // socket.on('disconnect', function(){
  //   console.log('User disconnected');
  // });
});