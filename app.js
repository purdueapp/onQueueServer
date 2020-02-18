/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library
let cors = require('cors');
let querystring = require('querystring');
let cookieParser = require('cookie-parser');
require('dotenv').config();

let client_id = process.env.CLIENT_ID; // Your client id
let client_secret = process.env.CLIENT_SECRET; // Your secret
let redirect_uri = 'http://data.cs.purdue.edu:7374/callback'; // Your redirect uri

let app = express();

/*app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser()); */

app.get("/json", (req, res) => {
  res.json({message: "Hello world"});
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

console.log('Listening on 7374');
app.listen(7374);