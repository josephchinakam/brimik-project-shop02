const mongoose = require("mongoose");

const logs = new mongoose.Schema({

	action: {type: String, required: true},
	username: {type: String, required: true},
	time: {type: String, required: true}
});

module.exports = mongoose.model("Logs", logs);