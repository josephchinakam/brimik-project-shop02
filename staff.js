const mongoose = require("mongoose");

const staff = new mongoose.Schema({

	name: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	phone: {type: String},
	position: {type: String},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Staff", staff);