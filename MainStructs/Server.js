//Server modules go here


/** Creates dynamic amount of JSONs, could be
    used to create JSON with server/client data
**/
function makeServerStruct(items) {
  var items = items.split(' ');
  var count = items.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[items[i]] = arguments[i];
    }
  }
  return constructor;
}

/** EXAMPLE USAGE
var Item = makeStruct("id speaker country");
var row = new Item(1, 'john', 'au');
alert(row.speaker); // displays: john
**/

//SERVER EXAMPLE
var Server = makeServerStruct("Router SocketServer Port ClientId ClientSecret RedirectUri Rooms RoomMap");
//var row = new Server() //INPUT VALUES HERE

function NewServer() {
  //define port, client, router, rooms etc
  return;
}
