var utils = require('utils');
var fs = require('fs');
var links:string[];
var casper = require('casper').create({
	pageSettings: {
		userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36',
		localToRemoteUrlAccessEnabled: true,
		loadImages: false,
		resourceTimeout: 240000,
		timeout: 240000,
		waitTimeout: 240000,
		stepTimeout: 240000,
		loadPlugins: false,
		webSecurityEnabled: false,
		outputEncoding: 'UTF-8',
		clientScripts: ['../node_modules/jquey/dist/jquery.min.js']
	},
	logLevel: 'debug',
	verbose: false
});

casper.options.onResourceReceived = function (C:any, response:any) {
	// utils.dump(response.contentType);
};

casper.on('remote.message', function (msg:any) {
	this.echo('remote message caught: ' + msg);
});

var setting = {
	startUrl: 'http://www.musinsa.com',
	imagePagingUrl: 'http://www.musinsa.com/index.php?m=street&_y=2016%2C2015%2C2014&_mon=5%2C6%2C7%2C8%2C9&gender=f&ordw=submitdate&p=1',
	loginForm: 'form[name="socialloginform"]',
	id: 'sawadee',
	pw: 'sawadee1919'
};

function getLinks() {
	'use strict';
	var links:NodeListOf<Element> = document.querySelectorAll('.snap-article-list .listItem .articleImg a');
	return Array.prototype.map.call(links, function (e:any) {
		return e.getAttribute('href');
	});
}

console.log('STARTING...');


casper
	.start(setting.startUrl, function () {
		this.fill(setting.loginForm, {
			id: setting.id,
			pw: setting.pw
		}, true);
	})
	.then(function () {
		console.log('Login Complete...');
	})
	.thenOpen(setting.imagePagingUrl, function () {
		links = this.evaluate(getLinks);
	})
	.then(function () {
		var imgUrl:String;
		this.each(links, function (self:any, link:any) {
			self.thenOpen(setting.startUrl + link, function () {
				imgUrl = this.getElementAttribute('.snapImg img', 'src');
				console.log('[JSON] image originalImgLink ', imgUrl);
				var file;
				this.waitFor(function () {
					return this.evaluate(function () {
						$.ajax({
							async: false,
							url: 'http:' + imgUrl,
							success: function (data:any, status:any, xhr:any) {
								utils.dump(status);
								file = data;
							}
						});
						return file;
					});
				}, function () {
					fs.write('images/' + imgUrl.split('/').pop(), file);
				});


				// this.download('http:' + imgUrl, 'images/' + imgUrl.split('/').pop());
			});
		});
	});


casper.run();
