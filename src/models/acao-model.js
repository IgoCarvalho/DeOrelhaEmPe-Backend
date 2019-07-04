const mongoose = require('mongoose');

const AcaoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        name: { type: String, required: true },
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

module.exports = mongoose.model('Acao', AcaoSchema, 'Acoes');
