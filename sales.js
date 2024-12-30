const mongoose = require("mongoose");

const sales = new mongoose.Schema({

	name: {type: String, required: true},
	cost: {type: String, required: true},
	quantity: {type: String},
	data: {type: String},
	orderid: {type: String},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Sales", sales);