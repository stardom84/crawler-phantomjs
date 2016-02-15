import exec = require('child_process');
import path = require('path');
import request = require('request');
import  fs = require('fs');
import  url = require('url');

var download = (uri:string, filename:string, dest:string, callback:Function) => {
	request.head(uri, (err:Object, res:Object) => {
		request(uri)
			.pipe(fs.createWriteStream(dest))
			.on('close', callback);
	});
};

var p = exec.exec('casperjs --web-security=no --output-encoding=UTF-8 ' + path.join(__dirname, 'casper.js'), {},
	(err:Error, stdout:Buffer, stderr:Buffer)=> {
		if (err) {
			console.log(err);
		}

	});

p.stdout.on('data', function (data:any) {
	console.log('node: ' + data.toString());
});
