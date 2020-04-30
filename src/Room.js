// Imports from other files
const User = require('./User');
const Handle = require('./Handle');

var roomMap = {};

module.exports = {
  /*  ------------------------------------------
      Create Room Command
      ------------------------------------------ */
  createRoom: function(socket, data) {
    // Create new room object
    let room = {
      playerState: data.playerState,
      members: [User.newUser(data.host.display_name, 'Host', data.host.id)],
      accessToken: data.accessToken,
      host: data.host,
      settings: {
        isPrivate: data.private,
        password: data.password,
        queueLimit: 50,
        djLimit: 5,
        defaultRole: 'DJ'
      },
      id: data.host.id
    }

    console.log('***** Room Object *****');
    console.log(room);
    console.log('***********************');
    
    // Add room to room dictionary
    roomMap[room.id] = room;

    // Client joins new room and send back room ID
    socket.join(room.id);
    return [room.id, { event: 'pause' }];
  },
  /*  ------------------------------------------
      Join Room Command
      ------------------------------------------ */
  joinRoom: function(socket, data) {
    console.log("***** Passed in Data Object *****");
    console.log(data);
    console.log("*********************************");

    // Check if room exists
    let currRoom = roomMap[data.roomID];
    if (typeof currRoom == 'undefined') {
      console.log("*** ERROR: ROOM DOES NOT EXIST ***");
      return {
        msg: "Room does not exist."
      }
    }

    // If private room. check password
    if (currRoom.settings.private) {
      if (currRoom.settings.password != data.password) {
        return {
          msg: "Incorrect password."
        }
      }
    }

    // Client joins passed in roomID and return room state
    socket.join(data.roomID);
    let user = User.newUser('', currRoom.settings.defaultRole, '', socket.id);
    currRoom.members.push(user);
    roomMap[data.roomID] = currRoom;
    return currRoom;
  },
  /*  ------------------------------------------
      Leave Room Command
      ------------------------------------------ */
  leaveRoom: function(socket) {
    let roomID = '';
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });
    let currRoom = roomMap[roomID];
    if (typeof currRoom == 'undefined') {
      return;
    }

    // Client leaves passed in roomID and makes appropriate changes
    for (var i = 0; i < currRoom.members.length; i++) {
        if (currRoom.members[i].sID == socket.id) {
            array.splice(i, 1);
        }
    }
    
    // Update room struct
    roomMap[roomID] = currRoom;
  },
  /*  ------------------------------------------
      Handle Event Command
      - Next
      - Previous
      - Pause
      - Play
      - Seek
      - Reorder
      - Queue
      - Remove
      ------------------------------------------ */
  handleEvent: function(socket, data) {
    let roomID = '';
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });
    let room = roomMap[roomID];
    if (typeof room == 'undefined') {
      console.log("*** ERROR: ROOM DOES NOT EXIST ***");
      return {
        msg: "Room does not exist."
      }
    }

    switch (data.type) {
      case 'playerState':
        Handle.handlePlayerState(room, data.playerState);
        break;
      case 'accessToken':
        Handle.handleAccessToken(room, data.accessToken);
        break;
      case 'settings':
        //Check if user is authorized
        console.log("Settings hit");
        console.log(data.settings);
        if (data.settings.maxQueueLength) {
          if (data.settings.maxQueueLength >= room.settings.queueLimit) {
            break;
          }
        }
        Handle.handleSetting(room, data.settings);
        break;
      case 'next':
        break;
      case 'previous':
        break;
      case 'pause':
        console.log("pause hit");
        //Handle.handlePause(room);
        break;
      case 'play':
        console.log("play hit");
        //Handle.handlePlay(room);
        break;
      case 'seek':
        break;
      case 'reorder':
        break;
      case 'queue':
        break;
      case 'remove':
        break;
      default:
        return {
          msg: "Unknown event command."
        }
    }
  },

  // For if someone wants to know information about all rooms
  handleInfo: function() {
    var rooms = [];
    for (var key in roomMap) {
      rooms.push({
        host: roomMap[key].host,
        members: roomMap[key].members,
        isPrivate: false
      });
    }
    return rooms;
  },

  handleSearch: async function(socket, query) {
    let roomID = '';
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });

    let room = roomMap[roomID];
    let res = await Handle.handleSongSearch(room, query);
    return res;
  }
}
