const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastLessonSchema = new Schema({
    tutorID: {
        type: String, 
        required: false,
        default: null
    },
    tutorName: {
        type: String,
        required: false,
        default: null
    },
    tutorEmail: {
        type: String,
        required: false,
        default: null
    },
    studentID: {
        type: String,
        required: false,
        default: null
    },
    studentName: {
        type: String,
        required: false,
        default: null
    },
    studentEmail: {
        type: String,
        required: false,
        default: null
    },
    startTime: {
        type: String,
        required: true,
        default: null
    },
    studentJoinTime: {
        type: String,
        required: false,
        default: null
    },
    studentExitTime: {
        type: String,
        required: false,
        default: null
    },
    tutorExitTime: {
        type: String,
        required: false,
        default: null
    },
    tutorJoinTime: {
        type: String,
        required: false,
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