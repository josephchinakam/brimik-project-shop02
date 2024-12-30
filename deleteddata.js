const mongoose = require("mongoose");

const deleteddata = new mongoose.Schema({

	type: {type: String, required: true},
	globalid: {type: String, required: true}
});

module.exports = mongoose.model("DeletedData", deleteddata);	