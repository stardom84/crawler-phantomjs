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
	verbose: false
});

function getLinks() {
	'use strict';
	var links:NodeListOf<Element> = document.querySelectorAll('.snapImg img');
	return Array.prototype.map.call(links, function (e:any) {
		return e.getAttribute('src');
	});
}

casper.start('http://www.musinsa.com/index.php', () => {
	this.fill('form[name="socialloginform"]', {
		id: 'sawadee',
		pw: 'sawadee1919'
	}, true);
});

casper.then(function () {
	this.echo(this.getTitle());
});

casper.thenOpen('http://www.musinsa.com/index.php?m=street&_y=2015&uid=23526', () => {
	links = this.evaluate(getLinks);
	this.download('http:' + links[0], 'images/test2.jpg');
	this.echo(' - ' + links.join('\n - ')).exit();
});


casper.run();
