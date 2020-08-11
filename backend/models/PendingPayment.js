const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingPaymentSchema = new Schema({
    tutorID: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    stripeID: {
        type: String,
        required: true
    }
});

module.exports = PendingPayment = mongoose.model('pendingPayment', PendingPaymentSchema);