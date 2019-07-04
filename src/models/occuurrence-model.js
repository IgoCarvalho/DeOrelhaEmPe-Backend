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
		key: {type: String, required: true},
		name: {type: String, required: true}
	},
	files: [{
		name: { type: String, required: true },
		url: { type: String, required: true },
		public_id: { type: String, required: true },
	}],
	geoData: {
		type: String,
		required: true
	},
	address: {
		street: { type: String, required: true },
		number: { type: Number, required: true },
		neighborhood: { type: String, required: true }
	},
	status:{
		type: {
			key: {type: String, required: true},
			name: {type: String, required: true}
		},
		default: {
			key: "nao-lido", 
			name: "Não lido"
		}
	},
	timeLine: {
		type: [{
			status:{
				key: {type: String, required: true},
				name: {type: String, required: true}
			},
			description: {type: String, required: true},
			date: {type: Date, default: Date.now}
		}],
		default:[{
			status: {key: "nao-lido", name: "Não lido"},
			description: "Ocorrencia registrada" 			
		}]
	},
	coments: [{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		text: { type: String, required: true },
		date: { type: Date, default: Date.now }
	}]

}, { timestamps: true })

module.exports = mongoose.model('Occurrence', OccurrenceSchema);
