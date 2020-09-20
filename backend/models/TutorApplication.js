const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorApplicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 5
    },
    stripeID: {
        type: String,
        required: false,
        default: null
    },
    applicationReason: {
        type: String,
        required: true
    }
});

module.exports = TutorApplication = mongoose.model('tutorApplications', TutorApplicationSchema);