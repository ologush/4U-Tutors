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
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    }
});

module.exports = TutorFeedback = mongoose.model('tutorFeedback', tutorFeedbackSchema);