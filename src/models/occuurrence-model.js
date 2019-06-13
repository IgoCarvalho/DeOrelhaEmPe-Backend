const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OccurrenceSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
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
		required: true
	},
	// images: [{
	// 	name: { type: String, required: true },
	// 	url: { type: String, required: true },
	// 	public_id: { type: String, required: true },
	// }],
	geoData: {
		type: String,
		required: true
	},
	timeLine: {
		type: [{
			status:{type: String, required: true},
			description: {type: String, required: true},
			date: {type: Date, default: Date.now}
		}],
		default:[{
			status: 'Ola',
			description: 'E ai garotinho' 			
		}]
	},
	coments: [{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		text: { type: String, required: true },
		date: { type: Date, default: Date.now }
	}]

}, { timestamps: true })

module.exports = mongoose.model('Occurrence', OccurrenceSchema);
