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
        type: String,
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
    }
});

module.exports = Lesson = mongoose.model('lessons', lessonSchema);