const mongoose = require("mongoose");

const orderitems = new mongoose.Schema({

	orderid: {type: String, required: true},
	name: {type: String, required: true},
	price: {type: String, required: true},
	quantity: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Orderitems", orderitems);