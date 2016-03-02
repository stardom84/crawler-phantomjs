import ImageModelInterface = require('./interface/ImageModelInterface');

class ImageModel implements ImageModelInterface {
	name:String;
	path:String;
	originalLink:String;
	takenDate:Date;
	originalImgLink:String;
	type:String;
	synced:boolean;

	constructor(name?:String) {
		this.name = name;
	};
}

export = ImageModel;
