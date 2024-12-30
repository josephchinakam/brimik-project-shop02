const mongoose = require("mongoose");

const yearexpdata = new mongoose.Schema({

	month: {type: String, required: true},
	total: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Yearexpdata", yearexpdata);