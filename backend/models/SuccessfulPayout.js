const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SuccessfulPayoutSchema = new Schema({
    tutorID: {
        type: String,
        required: true
    },
    stripeID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transferID: {
        type: String,
        required: true
    }
});

module.exports = SuccessfulPayout = mongoose.model('successfulPayout', SuccessfulPayoutSchema);