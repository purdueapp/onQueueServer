// Imports from other files
const User = require('./User');
const Update = require('./Update');
const Handle = require('./Handle');

var roomMap = {};

module.exports = {
  /*  ------------------------------------------
      Create Room Command
      ------------------------------------------ */
  createRoom: function(socket, data) {
    // Create new room object
    let room = {
      playerState: {
        trackWindow: {
          currentTrack:'',
          nextTracks: [],
          previousTracks: []
        },
        duration: 0,
        position: 0,
        volume: 0.5,
        paused: false
      },
      members: [User.newUser(data.host.display_name, 'Host', data.host.id)],
      accessToken: data.accessToken,
      host: data.host,
      settings: {
        private: data.private,
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
    let user = User.newUser('', currRoom.settings.defaultRole, '')
    currRoom.members.push(user);
    roomMap[data.roomID] = currRoom;
    return currRoom;
  },
  /*  ------------------------------------------
      Handle Update Command
      - Room
      - Player state
      - Track window
      - Members
      - Settings
      ------------------------------------------ */
  handleUpdate: function(socket, data) {
    switch(data.type) {
      case 'room':
        Update.updateRoom();
        break;
      case 'playerState':
        break;
      case 'trackWindow':
        break;
      case 'members':
        break;
      case 'settings':
        break;
      default:
        console.log("*** ERROR: UPDATE COMMAND '" + data.type + "' DOES NOT EXIST ***");
        return {
          msg: "Unknown update command."
        };
    }
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
    //console.log("for switch " + data.type);
    //console.log("-------------");
    //console.log("Before Update:");
    //console.log(room.playerState.position);
    //console.log(room.accessToken);
    switch (data.type) {
      case 'playerState':
        Handle.handlePlayerState(room, data.playerState);
        break;
      case 'accessToken':
        Handle.handleAccessToken(room, data.accessToken);
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
    //console.log("-------------");
    //console.log("AFTER UPDATE:");
    //console.log(room.playerState.position);
    //console.log(room.accessToken);
    //console.log("-------------");
  },

  // For if someone wants to know information about all rooms
  handleInfo: function() {
    var rooms = [];
    for (var key in roomMap) {
      rooms.push({
        host: roomMap[key].host,
        members: roomMap[key].members
      });
    }
    return rooms;
  },

  handleSearch: function(query) {
    let roomID = '';
    Object.values(socket.rooms).forEach(value => {
      if (value[0] !== socket.id) {
        roomID = value;
      }
    });
    let room = roomMap[roomID];
    return Handle.handleSongSearch(room, query);
  }
}
