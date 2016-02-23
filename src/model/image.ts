import mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	name: {type: String, trim: true, unique: true},
	path: {type: String, trim: true},
	originalLink: {type: String, trim: true},
	originalImgLink: {type: String, trim: true},
	synced: {type: Boolean, default: false},
	takenDate: {type: Date},
	streetModelId: {type: mongoose.Schema.Types.ObjectId},
	referrerId: {type: mongoose.Schema.Types.ObjectId},
	createdDate: {type: Date, default: Date.now},
	modifiedDate: {type: Date, default: Date.now}
});

imageSchema.index({referrerId: 1});

imageSchema.index({streetModelId: 1});

export = mongoose.model('image', imageSchema);
