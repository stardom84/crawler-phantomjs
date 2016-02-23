import express = require('express');
import path = require('path');
import fs = require('fs');


/**
 * MongoDB*
 */

var db = require('./config/db'),
	Image = require('./model/street-model');

/**
 * CasperJS*
 */

const spawn = require('child_process').spawn;

var p = spawn('casperjs', [path.join(__dirname, 'casper.js')]);

p.stdout.on('data', (data:any) => {
	console.log('node data: ' + data.toString());
	/*	var image = new Image({
	 name: {type: String, trim: true, unique: true},
	 path: {type: String, trim: true},
	 originalLink: {type: String, trim: true},
	 originalImgLink: {type: String, trim: true},
	 synced: Boolean,
	 takenDate: {type: Date},
	 });

	 image.save((err:any)=> {
	 if (err) {
	 throw err;
	 }
	 console.log('saved succesfully!');
	 });*/
});

p.on('close', (data:any) => {
	console.log('node close: ' + data.toString());
});

p.on('error', function (err:any) {
	console.log('node error: ' + err.toString());
});
