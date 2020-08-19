const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ComplaintSchema = new Schema({

    studentID: {
        type: String,
        required: true
    },
    tutorID: {
        type: String,
        required: true
    },
    complaintType: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    tutorEmail: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    pastLessonID: {
        type: String,
        required: true
    },
    dateSubmitted: {
        type: Date,
        required: true,
        default: Date.now()
    }

});

module.exports = Complaint = mongoose.model('complaint', ComplaintSchema);
