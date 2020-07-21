const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonBidSchema = new Schema({
    postingID: {
        type: String,
        required: true
    },
    tutorID: {
        type: String,
        required: true
    },
    tutorRating: {
        type: Number,
        required: true
    },
    tutorDescription: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    tutorName: {
        type: String,
        required: true
    }
});

module.exports = LessonBid = mongoose.model('lessonBid', lessonBidSchema);