const mongoose = require("mongoose");

const str = new mongoose.Schema({

	data: {type: String, required: true},
	username: {type: String, required: true}
});

module.exports = mongoose.model("Str", str);