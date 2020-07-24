const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorFeedbackSchema = new Schema({
    tutorID: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: false
    }
});

module.exports = TutorFeedback = mongoose.model('tutorFeedback', tutorFeedbackSchema);