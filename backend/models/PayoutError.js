const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayoutErrorSchema = new Schema({
    tutorID: {
        type: String,
        required: true
    },
    stripeID: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

module.exports = PayoutError = mongoose.model('payoutError', PayoutErrorSchema);