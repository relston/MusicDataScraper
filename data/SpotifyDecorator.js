'use strict';
let rollingStoneData = require('./rollingStoneData');
let SpotifyRepo = require('./SpotifyRepo');
let Promise = require("bluebird");
let RSAlbums = new rollingStoneData.cleaner();


class SpotifyDecorator {
	constructor () {

	}
	getSpAlbumByIndex(index) {
		let rsAlbum = RSAlbums.getAlbumByIndex(index);

		return new Promise((resolve, reject) => {
			SpotifyRepo.searchAlbums(rsAlbum.albumName).then(data=>{
				//get top results and compare
				var spAlbum = data.body.albums.items[0];
				//console.log("Search Match",rsAlbum.albumName, spAlbum.name);
				SpotifyRepo.getAlbum(spAlbum.id).then(data=>{
					resolve(data.body);
				}, err=>{
					console.log(err);
					reject();
				});
			}, err => {
				console.error(err);
				reject();
			});	
		})
	}
	getSpArtist(rsIndex, spArtistId) {
		return new Promise((resolve,reject)=>{
			SpotifyRepo.getArtist(spArtistId).then(data=>{
				resolve(data.body);
			}, err=>{
				console.log(err);
				reject();
			});
		})
	}
}

module.exports = SpotifyDecorator;