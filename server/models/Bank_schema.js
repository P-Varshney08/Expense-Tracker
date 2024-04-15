const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    interest_rate: {
        type: Number,
        required: true
    },
    assets: {
        type: Number,
        required: true
    }
});

const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;