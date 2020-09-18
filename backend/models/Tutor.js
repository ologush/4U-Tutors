const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
     name: {
        type: String,
        required: true
     },
     email: {
         type: String,
         required: true
     },
     password: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required: true
     },
     rating: {
         type: Number,
         required: true,
         default: 5
     },
     stripeID: {
         type: String,
         required: false,
         default: null
     }

});

module.exports = Tutor = mongoose.model('tutors', TutorSchema);