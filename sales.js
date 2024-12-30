const mongoose = require("mongoose");

const sales = new mongoose.Schema({

	name: {type: String, required: true},
	cost: {type: String, required: true},
	quantity: {type: String},
	date: {type: String},
	orderid: {type: String},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Sales", sales);
