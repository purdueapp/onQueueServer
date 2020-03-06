// // Room struct will be created here
/*
var Room = {
    ID           string              `json:"id"`
	Client       *spotify.Client     `json:"-"`
	Host         spotify.PrivateUser `json:"host"`
	HostSocketId string              `json:"-"`
	Queue        []spotify.FullTrack `json:"queue"`
	CurrentState string              `json:"state"`
	Mutex        sync.Mutex          `json:"-"`
	Server       *socketio.Server    `json:"-"`
	Size    int                 `json:"size"`
};
*/
var roomCounter = 0;

function getUniqueRoomID() {
  roomCounter++;
  return "room-" + roomCounter;
}

module.exports = {
  newRoom: function(hostID) {
    var room = {
      "ID": getUniqueRoomID(),
      "Host": hostID,
      "Queue": [],
      "Current": -1,
      "Size": 1
    }

    return room;
  }, 
  addTrack: function() {
    //something
  },
  removeTrack: function() {
    //something
  },
  nextTrack: function() {
    //something
  }
}