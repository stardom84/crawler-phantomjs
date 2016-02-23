import mongoose = require('mongoose');

var referrerSchema = new mongoose.Schema({
	name: {type: String, trim: true},
	url: {type: String, trim: true},
	createdDate: {type: Date, default: Date.now},
	modifiedDate: {type: Date, default: Date.now}
});

export = mongoose.model('referrer', referrerSchema);
