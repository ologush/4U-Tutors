const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
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
    studentName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    nextDates: {
        type: Array,
        required: false
    },
    otherStudentIDs: {
        type: Array,
        required: false
    }
});

module.exports = Lesson = mongoose.model('lessons', lessonSchema);