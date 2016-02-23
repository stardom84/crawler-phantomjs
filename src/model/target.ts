import mongoose = require('mongoose');

var targetSchema = new mongoose.Schema({
	url: {type: String, trim: true, unique: true},
	downloaded: {type: Boolean, default: false},
	referrerId: {type: mongoose.Schema.Types.ObjectId},
	createdDate: {type: Date, default: Date.now},
	modifiedDate: {type: Date, default: Date.now}
});

targetSchema.index({referrerId: 1});

export = mongoose.model('target', targetSchema);
