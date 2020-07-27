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
    }
});

module.exports = LessonRequest = mongoose.model("lessonRequest", lessonRequestSchema);