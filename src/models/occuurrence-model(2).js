const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OccurrenceSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	complaint: {
		type: Schema.Types.ObjectId,
		ref: "Complaint"
	},
	timeLine: [{
		status: { type: String, required: true },
		description: { type: String, required: true },
		date: { type: Date, default: Date.now }
	}],
	// coments: [{
	// 	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	// 	text: { type: String, required: true },
	// 	date: { type: Date, default: Date.now }
	// }]

}, { timestamps: true })

module.exports = mongoose.model('Occurrence', OccurrenceSchema);
