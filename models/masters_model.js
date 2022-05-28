var mongoose = require("mongoose");

var MasterSchema = mongoose.Schema({
	name:String,
	img: String
});

var Master = mongoose.model("Master", MasterSchema);
module.exports = Master;