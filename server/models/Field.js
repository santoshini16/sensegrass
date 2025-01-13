// models/Field.js
const mongoose= require('mongoose');

const FieldSchema = new mongoose.Schema({
    fieldName: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    cropType: {
        type: String,
        required: true
    },
    areaSize: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Field = mongoose.model('Field', FieldSchema);
module.exports = Field
