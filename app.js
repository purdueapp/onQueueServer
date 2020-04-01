// Setup basic express server
const fetch = require('node-fetch');
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

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  }
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Routing
/*
app.use(express.static(__dirname + '/public'))
  .use(cors(corsOptions))
  .use(cookieParser());
*/

app.get('/', function (req, res) {
    res.send('<b>onQueue Server</b>');
});

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

  // Handle room commands
  socket.on('command', function(data) {
    let roomID = '';
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });
    console.log(roomID);
    io.in(roomID).emit('command', data);
  });

  //Handle state updates
  socket.on('update', function(data) {
    let roomID = '';
    Room.handleEvent(socket, data);
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });
    io.in(roomID).emit('update', data);
  });

  socket.on('rooms', function() {
    socket.emit('rooms', Room.handleInfo());
  });

  socket.on('search', function(data) {
    console.log('Socket event "search" called.');
    Room.handleSearch(socket, data.query).then(data => {
      socket.emit('search', data);
    });
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
