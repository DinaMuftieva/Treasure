var mongoose = require("mongoose");

var ApplicationSchema = mongoose.Schema({
	name:String,
	date:String,
	service:String,
	addition: [String],
	master:String,
	number:String
});

var Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;