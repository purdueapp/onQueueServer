const fetch = require('node-fetch');
const url = require('url');
const qs = require('qs');

module.exports = {
    /*Handler for updating player state */
    handlePlayerState: function(room, state) {
        room.playerState = {
            ...room.playerState,
            ...state
        };
    },

    /*Handler for updating access token */
    handleAccessToken: function(room, state) {
        room.accessToken = state;
    },

    /*Handler for searching Spotify API for songs */
    handleSongSearch: async function(room, query) {
        let accessToken = room.accessToken;
        let params = qs.stringify({
          q: query,
          type: 'track',
          market: 'US',
          limit: 10
        });

        console.log(params);

        const res = await fetch('https://api.spotify.com/v1/search?' + params, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + accessToken
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data.tracks.items;
        });
        return res;
    },

    /*Handler for settings update */
    handleSetting: function(room, setting) {
        //console.log("before")
        //console.log(room.settings.queueLimit);
        room.settings = {
            ...room.settings,
            ...setting
        }
        //console.log("after");
        //console.log(room.settings.queueLimit);
    },

    /*Handler for playing song */
    handlePlay: function(room) {
        if (!room.playerState.paused) {
            room.playerState.paused = true;
        }
    },

    /*Handler for pausing a song */
    handlePause: function(room) {
        if (room.playerState.paused) {
            room.playerState.paused = false;
        }
    },

    /*Handler for adding a song to the queue */
    handleAddSong: function(data, room) {
        //TODO add song object when we figure out what data structure we're using

        //room.Queue += data.Song;
    },

    /*Handler for removing song from queue */
    handleRemoveSong: function(data, room) {
        //TODO remove song object when we figure out what data structure we're using

        //room.Queue -= data.Song; lol
    },

    /* Handler for skipping a song from the queue */
    handleSongSkip: function(data, room) {
        
    },

    /* Handler for going back to a song from the queue */
    handleSongGoBack: function(data, room) {
        //TODO update current song from song history when we figure out data structure
    },

    /* Handler for updating room privacy (public or private) */
    handleRoomTypeChange: function(room) {
        //room.settings.private = data.publicType;
    },

    /* Handler for volume change */
    handleVolume: function(data, room) {
        room.volume = data.volume;
    },

    /* Handler for changing the total amount of songs in a room */
    handleRoomSongLimit: function(data, room) {
        room.roomSongLimit = data.roomSongLimit;
    },

    /* Handler for changing the amount of a songs a user can queue in a room */
    handlePersonSongLimit: function(data, room) {
        room.personSongLimit = data.personSongLimit;
    },

    /* Handler for manually updating scrubber */
    handleManualScrub: function(data, room) {
        //Send host new song timer
    }

}
