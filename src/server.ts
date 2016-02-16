import express = require('express');
import path = require('path');
import fs = require('fs');


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

