// Setup basic express server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

// Imports from other files
const Room = require('./src/Room');

// Fired upon connection with client
io.on('connection', function(socket) {
  console.log('User connected');

  // Handle creating a room
  socket.on('create room', function(data) {
    res = Room.createRoom(socket, data);
    io.emit('create room', res);
  });

  // Handle joining a room
  socket.on('join room', function(data) {
    res = Room.joinRoom(socket, data);
    io.emit('join room', res);
  });

  // Handle room event
  socket.on('event', function(data) {
    res = Room.handleEvent(socket, data);
    io.emit('event', res);
  });

  // TODO: Handle disconnect
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
});

// HTML file for testing
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
