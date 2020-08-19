const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    studentID: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    infoTags: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
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
    availableTimes: {
        type: Array,
        required: true
    },
    datePosted: {
        type: Date,
        required: true,
        default: Date.now()
    },
    otherStudentIDs: {
        type: Array,
        required: false
    },
    numberOfParticipants: {
        type: Number,
        required: true,
        default: 1
    },
    numberOfRecurringLessons: {
        type: Number
    },
    otherStudentEmails: {
        type: Array
    },
    cost: {
        type: Number,
        required: true
    }
});

module.exports = Posting = mongoose.model('postings', postingSchema);