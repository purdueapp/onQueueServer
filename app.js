// Setup basic express server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 7374;
require('dotenv').config();

// Imports from other files
const Room = require('./src/Room');


// Routing
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

// HTTP server listen
http.listen(port, function(){
  console.log('Server listening at port %d', port);
});

// Fired upon connection with client
io.on('connection', function(socket) {
  console.log('User connected.');

  // Handle creating a room
  socket.on('create room', function(data) {
    console.log('Socket event "create room" called.');

    const res = Room.createRoom(socket, data);
    socket.emit('event', res[1]);
  });

  // Handle joining a room
  socket.on('join room', function(data) {
    console.log('Socket event "join room" called.');

    res = Room.joinRoom(socket, data);
    socket.emit('update', {
      type: 'room',
      room: res
    });
  });

  // Handle room event
  socket.on('command', function(data) {
    console.log('Socket event "command" called.');
    //let room = Room.handleEvent(socket, data);
    let roomID = '';
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });
    console.log(roomID);
    io.in(roomID).emit('command', data);
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
