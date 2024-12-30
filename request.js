const mongoose = require("mongoose");

const request = new mongoose.Schema({

	topic: {type: String, required: true},
	description: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Request", request);