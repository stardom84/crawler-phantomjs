import express = require('express');
import path = require('path');
import fs = require('fs');


/**
 * MongoDB*
 */

var db = require('./config/db'),
	Image = require('./model/image');

/**
 * CasperJS*
 */

const spawn = require('child_process').spawn;

var p = spawn('casperjs', [path.join(__dirname, 'casper.js')]);

var image;

p.stdout.on('data', (data:any) => {
	var stdout = data.toString(),
		stdoutArray = stdout.split(' ');

	if (stdoutArray[0] === '[JSON]') {
		console.log(JSON.stringify(stdout));
		image = new Image({
			name: stdoutArray[4],
			path: {type: String, trim: true},
			originalLink: {type: String, trim: true},
			originalImgLink: stdoutArray[3],
			synced: true
		});

		image.save((err:any)=> {
			if (err) {
				throw err;
			}
			console.log('image' + stdoutArray[4] + 'saved succesfully!');
		});
	}

	console.log(stdout);


});

p.on('close', (data:any) => {
	console.log('node close: ' + data.toString());
});

p.on('error', function (err:any) {
	console.log('node error: ' + err.toString());
});
