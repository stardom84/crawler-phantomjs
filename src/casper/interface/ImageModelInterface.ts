import mongoose = require('mongoose');
import ModelInterface = require('./ModelInterface');

interface ImageModelInterface extends ModelInterface {
	name:String;
	path:String;
	originalLink:String;
	originalImgLink:String;
	type:String;
	synced:boolean;
	takenDate:Date;
}

export = ImageModelInterface;
