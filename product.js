const mongoose = require("mongoose");

const product = new mongoose.Schema({

	name: {type: String, required: true},
	ispromotion: {type: String, required: true},
	price: {type: String, required: true},
	quantity: {type: String},
	pic: {type: String},
	category: {type: String},
	description: {type: String, required: true},
	costprice: {type: String},
	sold: {type: String},
	infinite: {type: String},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("Product", product);