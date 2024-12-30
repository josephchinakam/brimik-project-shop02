const mongoose = require("mongoose");

const saledata = new mongoose.Schema({

	day: {type: String, required: true},
	total: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Saledata", saledata);