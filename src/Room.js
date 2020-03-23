var roomCounter = 0;
var roomMap = {};

function getUniqueRoomID() {
  roomCounter++;
  return "room-" + roomCounter;
}

module.exports = {
  newRoom: function(socket, data) {
    let room = {
      id: getUniqueRoomID(),
      host: data.hostID,
      users: [], //User objects with role
      queue: [],
      current: -1,
      size: 1,
      play: true,
      volume: 0, //range between 0 and 100
      publicType: 1, //1 for public, 0 for private
      roomSongLimit: 100,
      personSongLimit: 50,
      songTime: 10 //Number in seconds, We might not need to store this
    }
    roomMap[room.ID] = room;

    console.log('New room created: ' + room.ID);

    // Client joins new room and send back room ID
    socket.join(room.ID);
    return room.ID;
  },
  joinRoom: function(socket, data) {
    console.log('User joined ' + data.roomID);

    // Client joins passed in roomID
    socket.join(data.roomID);

    // Get room data and send back confirmation
    let currRoom = roomMap[data.roomID];
    if (typeof currRoom !== 'undefined') {
      currRoom.Size += 1;
      return true;
    } else {
      return false;
    }
  },
  handleEvent: function(socket, data) {
    // TODO: handle different room events

    //Switch statement based on last command of JSON, may be empty or pick event

    // TODO: Send back entire room state
  }
}
