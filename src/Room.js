var roomCounter = 0;
var roomMap = {};

function getUniqueRoomID() {
  roomCounter++;
  return "room-" + roomCounter;
}

module.exports = {
  newRoom: function(socket, data) {
    var room = {
      "ID": getUniqueRoomID(),
      "Host": data.hostID,
      "Users": [], //User objects with role
      "Queue": [],
      "Current": -1,
      "Size": 1,
      "Play": true,
      "Volume": 0, //range between 0 and 100
      "PublicType": 1, //1 for public, 0 for private
      "RoomSongLimit": 100,
      "PersonSongLimit": 50,
      "SongTime": 10 //Number in seconds, We might not need to store this
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
    currRoom = roomMap[data.roomID];
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
