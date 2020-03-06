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

const Room = require('./src/Room');

// Fired upon connection with client
io.on('connection', function(socket) {
  console.log('User connected');

  // Handle creating a room
  socket.on('create room', function(data) {
    // Create new room
    newRoom = Room.newRoom(data.userID);
    console.log('New room created: ' + newRoom.ID);

    // Client joins new room and send back room ID
    socket.join(newRoom.ID);
    io.emit('create room', newRoom.ID);
  });

  // Handle joining a room
  socket.on('join room', function(data) {
    socket.join(data.roomID);
    console.log('User joined ' + data.roomID);
  });

  // Each socket fires a 'disconnect' event as well
  socket.on('disconnect', function(){
    console.log('User disconnected');
  });
});

// HTML file for testing
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });