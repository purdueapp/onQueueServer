// Imports from other files
const User = require('./User');

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
      members: [User.newUser(data.host, 'Host', data.host)],
      accessToken: data.accessToken,
      host: data.host,
      settings: {
        private: data.private,
        password: data.password,
        queueLimit: 50,
        djLimit: 5,
        defaultRole: 'DJ'
      },
    }

    console.log('***** Room Object *****');
    console.log(room);
    console.log('***********************');
    
    // Add room to room dictionary
    roomMap[room.host] = room;

    // Client joins new room and send back room ID
    socket.join(room.host);
    return room.host;
  },
  /*  ------------------------------------------
      Join Room Command
      ------------------------------------------ */
  joinRoom: function(socket, data) {
    // If private room. check password
    if (room.settings.private) {
      if (room.settings.password != data.password) {
        return {
          msg: "Incorrect password."
        }
      }
    }

    // Check if room exists
    let currRoom = roomMap[data.roomID];
    if (typeof currRoom == 'undefined') {
      return {
        msg: "Room does not exist."
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
    switch (data.event) {
      case 'next':
        break;
      case 'previous':
        break;
      case 'pause':
        break;
      case 'play':
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

    // TODO: Send back entire room state
  }
}
