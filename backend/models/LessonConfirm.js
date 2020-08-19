const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonConfirmSchema = new Schema({
    studentID: {
        type: String,
        required: true
    },
    tutorID: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: Date,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    tutorName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    studentName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    otherStudentIDs: {
        type: Array,
        required: true
    },
    otherStudentEmails: {
        type: Array,
        required: true
    },
    payout: {
        type: Number,
        required: true
    }
});

module.exports = LessonConfirm = mongoose.model('lessonConfirm', lessonConfirmSchema);