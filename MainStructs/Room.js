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
class Room {
    constructor (id) {
        this.id = id;
	// Server       *socketio.Server    `json:"-"`
    }
}