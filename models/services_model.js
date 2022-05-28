var mongoose = require("mongoose");

var ServiceSchema = mongoose.Schema({
	tag: String,
	name:String,
	short_description: [ String ],
	long_description: [ String ]
});

var Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;