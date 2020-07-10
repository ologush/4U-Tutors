var express = require('express');
var router = express.Router();

const Posting = require('../models/Posting');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const axios = require('axios');
//Add a validation layer

router.post('/addPosting', (req, res) => {
    //add the validation here see other routes
    console.log(req.body);
    User.findOne({ _id: req.body.studentID })
        .then(user => {
            if(user) {
                const newPosting = new Posting({
                    studentID: req.body.studentID,
                    course: req.body.course,
                    infoTags: req.body.infoTags,
                    description: req.body.description,
                    year: req.body.year,
                    studentName: req.body.studentName,
                    type: req.body.type,
                    availableTimes: req.body.availableTimes,
                    datePosted: req.body.datePosted,
                    otherStudentIDs: req.body.otherStudentIDs,
                    numberOfParticipants: req.body.numberOfParticipants,
                    numberOfRecurringLessons: req.body.numberOfRecurringLessons,
                    otherStudentEmails: req.body.otherStudentEmails
                });

                newPosting
                    .save()
                    .then(posting => res.json(posting))
                    .catch(err => console.log(err));
            } else {
                console.log("The user doesnt exist");
                return res.status(400).json( {userError: "User does not exist"} );
            }
        })
        .catch(err => console.log(err));

});

router.post("/editPosting", (req, res) => {

    const update = {
        studentID: req.body.studentID,
        course: req.body.course,
        infoTags: req.body.infoTags,
        description: req.body.description,
        year: req.body.year,
        studentName: req.body.studentName,
        type: req.body.type,
        availableTimes: req.body.availableTimes,
        datePosted: req.body.datePosted,
        otherStudentIDs: req.body.otherStudentIDs,
        numberOfParticipants: req.body.numberOfParticipants,
        numberOfRecurringLessons: req.body.numberOfRecurringLessons
    };
    Posting.findOneAndUpdate({ _id: req.body.postingID }, update)
        .then(doc => {
            res.json(doc);
        })
        .catch(err => console.log(err))
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

router.get('/getPostings', (req, res) => {
    Posting.find()
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
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});

module.exports = router;
