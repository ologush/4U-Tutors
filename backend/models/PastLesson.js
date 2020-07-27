const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastLessonSchema = new Schema({
    tutorID: {
        type: String, 
        required: true
    },
    tutorName: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    studentJoinTime: {
        type: String,
        required: true
    },
    tutorJoinTime: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
});

module.exports = PastLesson = mongoose.model('pastLesson', pastLessonSchema);