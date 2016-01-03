//this refreshes the DB with core data
var pg = require("pg");
var util = require('util');
var RsData = require('../data/rollingStoneData');
var conString = "postgres://postgres:password@localhost:5433/MusicData";


pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('DROP TABLE if exists albums', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }

    var query = client.query('CREATE TABLE albums(id SERIAL PRIMARY KEY, metadata json)', function (){ 	
    	var simpleAsyncCountdown = RsData.siteAlbumIDs.length;
    	var rsData = new RsData.cleaner();
    	
    	for (var i = 0; i < simpleAsyncCountdown; i++) {
    		var albumData = rsData.getAlbumByIndex(i);
    		client.query('INSERT into albums (metadata) VALUES($1)', [JSON.stringify(albumData)], function (err, result){
    			if (err) console.log(err)
    			else console.log('row inserted: ' + result)
    			simpleAsyncCountdown--;
    			if( simpleAsyncCountdown ===0) {
    				console.log("completed");
    				done();
    			}
    		});
    	};
	});
  });
});




