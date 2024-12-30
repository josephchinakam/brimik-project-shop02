const mongoose = require("mongoose");

const yeardata = new mongoose.Schema({

	month: {type: String, required: true},
	total: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Yeardata", yeardata);