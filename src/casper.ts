var links:string[];
var casper = require('casper').create({
	pageSettings: {
		userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36',
		localToRemoteUrlAccessEnabled: true,
		loadImages: false,
		loadPlugins: false,
		webSecurityEnabled: false,
		outputEncoding: 'UTF-8'
	},
	logLevel: 'debug',
	verbose: true
});

function getLinks() {
	'use strict';
	var links:NodeListOf<Element> = document.querySelectorAll('.snapImg img');
	return Array.prototype.map.call(links, function (e:any) {
		return e.getAttribute('src');
	});
}

console.log('STARTING...');


casper.start('http://www.musinsa.com/index.php', function () {
	console.log('Initial Page Opened...');
	this.fill('form[name="socialloginform"]', {
		id: 'sawadee',
		pw: 'sawadee1919'
	}, true);
});

casper.then(function () {
	console.log('Login Complete...');
	this.echo(this.getTitle());
});

casper.thenOpen('http://www.musinsa.com/index.php?m=street&_y=2015&uid=24934', function () {
	console.log('Moved To /index.php?m=street&_y=2015&uid=24934 ...');
	links = this.evaluate(getLinks);
	this.download('http://image.musinsa.com/mfile_s01/_street_images/24934/street_56bda98075ed6.jpg', 'images/test.jpg');
	this.echo(' - ' + links.join('\n - ')).exit();
});


casper.run();
