const mongoose = require("mongoose");

const expenses = new mongoose.Schema({

	name: {type: String, required: true},
	cost: {type: String, required: true},
	date: {type: String, required: true},
	quantity: {type: String},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Expenses", expenses);