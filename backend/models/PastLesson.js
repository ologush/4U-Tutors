const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastLessonSchema = new Schema({
    tutorID: {
        type: String, 
        required: true,
        default: null
    },
    tutorName: {
        type: String,
        required: true,
        default: null
    },
    tutorEmail: {
        type: String,
        required: true,
        default: null
    },
    studentID: {
        type: String,
        required: true,
        default: null
    },
    studentName: {
        type: String,
        required: true,
        default: null
    },
    studentEmail: {
        type: String,
        required: true,
        default: null
    },
    startTime: {
        type: String,
        required: true,
        default: null
    },
    studentJoinTime: {
        type: String,
        required: true,
        default: null
    },
    studentExitTime: {
        type: String,
        required: true,
        default: null
    },
    tutorExitTime: {
        type: String,
        required: true,
        default: null
    },
    tutorJoinTime: {
        type: String,
        required: true,
        default: null
    },
    subject: {
        type: String,
        required: true
    },
    lessonID: {
        type: String,
        required: true
    }
});

module.exports = PastLesson = mongoose.model('pastLesson', pastLessonSchema);