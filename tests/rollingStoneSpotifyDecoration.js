'use strict';
let expect = require('expect.js'); //https://www.npmjs.com/package/expect.js
let SpotifyDecorator = require('../data/SpotifyDecorator');
//let request = require('superagent'); //https://www.npmjs.com/package/superagent

describe('Spotify Repository', function () {
	let sptfyDcrtr = new SpotifyDecorator();
	let spAlbum;
	it('should pull album data', done => {
		sptfyDcrtr.getSpAlbumByIndex(0).then(album => {
			spAlbum = album;
			console.log(spAlbum);
			done();
		});
	});
	it('should pull track data from album', done => {
		let tracks = spAlbum.tracks.items;
		expect(tracks.length).to.be.above(1);
		done();
	});
	it('should pull artist data from album', done => {
		sptfyDcrtr.getSpArtist(0, spAlbum.artists[0].id).then(data=>{
			done();
		});
	});

});

describe('RS Album Decorator', function () {	
	it('should create Album Entity w meta');
	it('should create Artist Entity w Meta')
	it('should create Track data w Meta');
	it('should create Track data w Meta');
});

describe('RS List Creator', function () {
	it('should create RS list');
	it('should have list json data that points to Album Entities');
	it('should save all entity data to DB');
});
