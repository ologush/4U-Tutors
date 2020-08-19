const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonRequestSchema = new Schema({
    studentID: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    tutorName: {
        type: String,
        required: true
    },
    tutorID: {
        type: String,
        required: true
    },
    availableTimes: {
        type: Array,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    otherStudentEmails: {
        type: Array,
        required: true
    },
    otherStudentIDs: {
        type: Array,
        required: true
    },
    numberOfParticipants: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    payout: {
        type: Number,
        required: true
    }
});

module.exports = LessonRequest = mongoose.model("lessonRequest", lessonRequestSchema);