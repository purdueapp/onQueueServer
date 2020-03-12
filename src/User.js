module.exports = {
  newUser: function(socket, data) {
    var user = {
      "ID": 0, //import later from Spotify, get Spotify ID if signed in, otherwise generate uniqueID
      "Role": 0, //0 for Admin, 1 for DJ, 2 for Listener, 3 for Host
    }

    console.log('New user created: ' + user.ID);
  },
  handleEvent: function(socket, data) {
    // TODO: handle different user events
  }
}
