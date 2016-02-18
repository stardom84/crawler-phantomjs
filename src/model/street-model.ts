import mongoose = require('mongoose');

var streetModelSchema = new mongoose.Schema({
		name: {type: String},
		age: {type: Number, max: 100, min: 0},
		nationality: {type: String, trim: true},
		location: {type: String, trim: true},
		occupation: {type: String, trim: true},
		height: {type: Number, max: 300, min: 0},
		weight: {type: Number, max: 1000, min: 0},
		intro: {type: String, trim: true},
		desc: {type: String, trim: true},
		registeredDate: {type: Date, default: Date.now},
		imageId: {type: mongoose.Schema.Types.ObjectId},
		createdDate: {type: Date, default: Date.now},
		modifiedDate: {type: Date, default: Date.now}
	},
	{collection: 'streetModel'});

streetModelSchema.index({imageId: 1});

export = mongoose.model('streetModel', streetModelSchema);
