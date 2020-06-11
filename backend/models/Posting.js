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
    }

});

module.exports = Posting = mongoose.model('postings', postingSchema);