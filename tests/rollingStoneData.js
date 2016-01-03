// need to test out the data and the endpoints
var expect = require('expect.js'); //https://www.npmjs.com/package/expect.js
var request = require('superagent'); //https://www.npmjs.com/package/superagent
//grabing my static data
var rollingStoneData = require('../data/rollingStoneData');
var RollingStoneScraper = rollingStoneData.scraper;
var siteAlbumIDs = rollingStoneData.siteAlbumIDs;
var siteAlbumEndpoint = rollingStoneData.siteAlbumEndpoint;

var albumScraper = new RollingStoneScraper();

describe('Rolling Stone Data', function (){
	it('should have 500 albums ids', function (done){
		expect(rollingStoneData.siteAlbumIDs.length).to.equal(500);
		done();
	});

	describe('API endpoint',function  (){
		it('should be reachable', function(done){
			request.get(siteAlbumEndpoint).end(function(err, res){
				expect(res.status).to.equal(200);
				done();
			});
		});
	});

	describe('API Scraper', function() {
		
		it('should return one album', function(done){
			albumScraper.getRawAlbum(siteAlbumIDs[0], function(data){
				expect(data.length).to.equal(1);
				done();
			});
		});
		it('should return a set of albums', function(done){
			albumScraper.getRawAlbums(siteAlbumIDs.slice(0,10), function(data){
				expect(data.length).to.equal(10);
				done();
			});
		});
		it.skip('should write a file with data', function (done){
			var saveUtil  = new rollingStoneData.saveUtil();
			saveUtil.start(function(filepath){
				expect(filepath).to.not.be.empty();
				fs.access(filepath, fs.R_OK | fs.W_OK, function (err) {
					expect(err).to.be(null);
					done();
				});
			});
		});
	});
	describe('Data Cleaner', function(){
		it('should return an object');
		it('should have a rank, artist, album name and album art');
		it('should have article copy');
		it('should have article copy');
	});
	describe('Data Repository', function(){
		it('should look up album by ID');
		it('should look up album by rank');
		

	})
})