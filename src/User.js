var userCount = 0;

function uniqueUserID() {
  userCount++;
  return "user" + userCount;
}

module.exports = {
  newUser: function(newName, newRole, newID, socketID) {
    if (newName == '') {
      newName = uniqueUserID();
    }
    if (newID == '') {
      newID = uniqueUserID();
    }

    var user = {
      sID: socketID,
      displayName: newName,
      role: newRole,
      id: newID,
      songsQueued: 0
    }

    return user;
  }
}
