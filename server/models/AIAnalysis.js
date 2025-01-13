// models/AIAnalysis.js
const mongoose = require('mongoose');

const AIAnalysisSchema = new mongoose.Schema({
    fieldId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Field',
        required: true
    },
    soilHealth: {
        phLevel: Number,
        moistureLevel: Number,
        temperature: Number,
        nutrients: {
            nitrogen: Number,
            phosphorus: Number,
            potassium: Number
        }
    },
    cropHealth: {
        healthStatus: String,
        yieldEstimate: Number
    },
    createdAt: { type: Date, default: Date.now }
});

const AIAnalysis = mongoose.model('AIAnalysis', AIAnalysisSchema);
module.exports = AIAnalysis;
