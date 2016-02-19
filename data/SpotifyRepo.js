//https://api.spotify.com/v1/albums/1PULmKbHeOqlkIwcDMNwD4

'use strict';
let SpotifyWebApi = require('spotify-web-api-node');
let request = require('superagent');
let Promise = require("bluebird");

let apiEndpoint = 'https://api.spotify.com/v1/'
let spotifyApi = new SpotifyWebApi({
  clientId : process.env.SpotifyClientID,
  clientSecret : process.env.SpotifySecret,
  redirectUri : 'localhost:3000/spfycb/'
});

//dont thing I need to do this
class SpotifyRepo {
	searchAlbums(albumName) {
		return new Promise((resolve, reject) => {
			request.get(apiEndpoint+'search?type=album&q='+albumName).end((err, res) => {
				console.log(res.body);
				resolve(res.body);
			});
		});
	}
}

module.exports = spotifyApi;