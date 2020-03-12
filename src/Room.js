var roomCounter = 0;
var roomMap = {};

function getUniqueRoomID() {
  roomCounter++;
  return "room-" + roomCounter;
}

module.exports = {
  newRoom: function(socket, data) {
    let room = {
      "ID": getUniqueRoomID(),
      "Host": data.hostID,
      "Users": [], //User objects with role
      "Queue": [],
      "Current": -1,
      "Size": 1,
      "Play": true,
      "Volume": 0,
      "Type": "public",
      "RoomSongLimit": 100,
      "PersonSongLimit": 50,
      "SongTime": 10 //Number in seconds
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
  }
}