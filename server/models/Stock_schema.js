const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    }
});


const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    history: {
        type: [priceHistorySchema],
        default: []
    }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;