import express = require('express');
import path = require('path');
import fs = require('fs');


/**
 * MongoDB*
 */

var db = require('./config/db'),
	StreetModel = require('./model/street-model');

var streetModel = new StreetModel({
	name: '김일구',
	age: 33,
	nationality: '한국',
	location: '부천',
	occupation: '백수',
	height: 170,
	weight: 90,
	intro: '으흐으흐',
	desc: '으흐으흐흐흐흐'
});

streetModel.save((err:any)=> {
	if (err) {
		throw err;
	}
	console.log('saved succesfully!');
});


/**
 * CasperJS*
 */

const spawn = require('child_process').spawn;

var p = spawn('casperjs', [path.join(__dirname, 'casper.js')]);

p.stdout.on('data', (data:any) => {
	console.log('node data: ' + data.toString());
});

p.on('close', (data:any) => {
	console.log('node close: ' + data.toString());
});

p.on('error', function (err:any) {
	console.log('node error: ' + err.toString());
});

