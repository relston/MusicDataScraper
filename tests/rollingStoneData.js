'use strict';
// need to test out the data and the endpoints
let expect = require('expect.js'); //https://www.npmjs.com/package/expect.js
let request = require('superagent'); //https://www.npmjs.com/package/superagent
//grabing my static data
let rollingStoneData = require('../data/rollingStoneData');
let RollingStoneScraper = rollingStoneData.scraper;
let siteAlbumIDs = rollingStoneData.siteAlbumIDs;
let siteAlbumEndpoint = rollingStoneData.siteAlbumEndpoint;

let albumScraper = new RollingStoneScraper();

describe('Rolling Stone Data', function () {
	this.timeout(5000);
	
	it('should have 500 albums ids', done => {
		expect(rollingStoneData.siteAlbumIDs.length).to.equal(500);
		done();
	});

	describe('API endpoint', () => {
		it('should be reachable', done => {
			request.get(siteAlbumEndpoint).end((err, res) =>{
				expect(res.status).to.equal(200);
				done();
			});
		});
	});

	describe('API Scraper', () => {
		
		it('should return one album', done => {
			albumScraper.getRawAlbum(siteAlbumIDs[0], data => {
				expect(data.length).to.equal(1);
				done();
			});
		});
		it('should return a set of albums', done => {
			albumScraper.getRawAlbums(siteAlbumIDs.slice(0,10), data => {
				expect(data.length).to.equal(10);
				done();
			});
		});
		it.skip('should write a file with data', done => {
			var saveUtil  = new rollingStoneData.saveUtil();
			saveUtil.start(function(filepath){
				expect(filepath).to.not.be.empty();
				fs.access(filepath, fs.R_OK | fs.W_OK, err => {
					expect(err).to.be(null);
					done();
				});
			});
		});
	});
	describe('Data Cleaner', () => {
		let cleaner = new rollingStoneData.cleaner();

		it('should return album data', () => {
			expect(cleaner).not.to.be(null);
			expect(cleaner.data.length).to.be.above(1);
		});
		it('all albums should have a rank, artist, album name and album art, article copy', ()=>{
			for (var i = 0; i < cleaner.data.length; i++) {
				let album = cleaner.getAlbumByIndex(i);
				expect(album.albumId).to.be.ok();
				//console.log(album.albumId);
				expect(album.albumRank).to.be.ok();
				//console.log(album.albumRank);
				expect(album.listNumber).to.be.ok();
				//console.log(album.listNumber);
				expect(album.albumRank).to.eql(album.listNumber);
				expect(album.albumNameRaw).to.be.ok();
				//console.log(album.albumNameRaw);
				expect(album.artistName).to.be.ok();
				//console.log(album.artistName);
				expect(album.albumName).to.be.ok();
				//console.log(album.albumName);
				expect(album.albumArtPath).to.be.ok();
				//console.log(album.albumArtPath);
				expect(album.albumCredit).to.be.ok();
				//console.log(album.albumCredit);
				expect(album.albumCopy).to.be.ok();
				//console.log(album.albumCopy);
			};
			
		});
	});
	describe('Data Repository', () => {
		it('should look up album by ID');
		it('should look up album by rank');

	})
})