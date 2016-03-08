import ImageModelInterface = require('./interface/ImageModelInterface');

class ImageModel {
	name:String;
	path:String;
	originalLink:String;
	takenDate:Date;
	originalImgLink:String;
	type:String;
	synced:boolean;

	constructor() {
	};
}

export = ImageModel;
