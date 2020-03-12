module.exports = {
  newUser: function(socket, data) {
    var user = {
      "ID": 0, //import later from Spotify
    }

    console.log('New user created: ' + user.ID);
  },
  handleEvent: function(socket, data) {
    // TODO: handle different user events
  }
}
