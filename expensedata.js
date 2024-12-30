const mongoose = require("mongoose");

const expensedata = new mongoose.Schema({

	day: {type: String, required: true},
	total: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Expensedata", expensedata);