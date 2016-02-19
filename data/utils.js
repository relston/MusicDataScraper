'use strict';
var util = require('util')
var rollingStoneData = require('../data/rollingStoneData');
var SpotifyDecorator = require('./SpotifyDecorator');

var repo = new rollingStoneData.cleaner();
var sptfyDcrtr = new SpotifyDecorator();

//console.log(repo.getAlbumById("145952"));
function showRSData () {
	for (var i = 0; i < rollingStoneData.siteAlbumIDs.length; i++) {
		var album = repo.getAlbumByIndex(i);
		//console.log(util.format("album id:%s rank:%s", album.albumId, album.albumRank));	
		//console.log(util.format("album name:%s", album.rollingStoneContent.albumNameRaw));	
		console.log(util.format("artist:%s 			album name:%s  ", album.rollingStoneContent.artistName, album.rollingStoneContent.albumName));	
	};	
}

process.argv.forEach((val, index, array) => {
	if (index >= 2){
		if (Number(val) >= 0 ) {
			sptfyDcrtr.getSpAlbumByIndex(val).then(album => {
				console.log(album);
			});
		} else if (val.indexOf('raw') === 0){
			let albumIndex = Number(val.split(':')[1]);
			console.log(repo.data[albumIndex]);
		} else if (val.indexOf('copy') === 0){
			let albumIndex = Number(val.split(':')[1]);
			console.log(repo.getAlbumCopy(repo.data[albumIndex].content));
		} else if (val == 'rsdata') {
			showRSData();
		}
	}
})

//console.log(repo.getAlbumByIndex(168).rollingStoneContent.albumNameRaw);

