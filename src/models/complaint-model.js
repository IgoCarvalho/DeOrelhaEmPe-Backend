const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		enum: ["cat-1", "cat-2", "cat-3",],
		required: true
	},
	images: [{
		title: { type: String, required: true },
		url: { type: String, required: true },
	}],
	localization: {
		type: String,
		required: true
	}

})

module.exports = mongoose.model('Complaint', ComplaintSchema);
