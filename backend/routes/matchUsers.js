var express = require('express');
var router = express.Router();

const Posting = require('../models/Posting');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
//Add a validation layer

router.post('/addPosting', (req, res) => {
    //add the validation here see other routes

    User.findOne({ _id: req.body.studentID })
        .then(user => {
            if(user) {
                const newPosting = new Posting({
                    studentID: req.body.studentID,
                    course: req.body.course,
                    infoTags: req.body.infoTags,
                    description: req.body.description,
                    year: req.body.year,
                    studentName: req.body.studentName
                });

                newPosting
                    .save()
                    .then(posting => res.json(posting))
                    .catch(err => console.log(err));
            } else {
                return res.status(400).json( {userError: "User does not exist"} );
            }
        })
        .catch(err => console.log(err));

});

router.post('/getPostingsByTags', (req, res) => {
    const tags = req.body.tags;
    console.log(tags);
    

    Posting.find({ infoTags: { $in: tags}})
        .skip(req.body.amountPerSet * req.body.setNumber)
        .limit(req.body.amountPerSet)
        .then(docs => {
            return res.json(docs);
        })
        .catch(err => console.log(err));

    
});

router.post('/setMatch', (req, res) => {
    
    Posting.findOneAndDelete({ _id: req.body.postingID })
        .then(posting => {
            const newLesson = new Lesson({
                studentID: posting.studentID,
                tutorID: req.body.tutorID,
                dateAndTime: req.body.dateAndTime,
                subject: posting.course,
                tutorName: req.body.tutorName,
                studentName: posting.studentName
            });

            newLesson.save()
                .then(lesson => res.json(lesson))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

module.exports = router;
