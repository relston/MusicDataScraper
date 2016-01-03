var util = require('util')
var rollingStoneData = require('../data/rollingStoneData');

var repo = new rollingStoneData.cleaner();

//console.log(repo.getAlbumById("145952"));
function run () {
	for (var i = 0; i < rollingStoneData.siteAlbumIDs.length; i++) {
		var album = repo.getAlbumByIndex(i);
		//console.log(util.format("album id:%s rank:%s", album.albumId, album.albumRank));	
		//console.log(util.format("album name:%s", album.rollingStoneContent.albumNameRaw));	
		console.log(util.format("artist:%s 			album name:%s  ", album.rollingStoneContent.artistName, album.rollingStoneContent.albumName));	
	};	
}

run();

//console.log(repo.getAlbumByIndex(168).rollingStoneContent.albumNameRaw);

