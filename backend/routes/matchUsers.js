var express = require('express');
var router = express.Router();

const Posting = require('../models/Posting');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const axios = require('axios');
const LessonBid = require('../models/LessonBid');
const passport = require('passport')

//Add a validation layer

router.post('/addPosting', passport.authenticate('user', { session: false }),  (req, res) => {
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

router.post("/editPosting", passport.authenticate('user', { session: false }), (req, res) => {

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

router.post('/getPostingsByTags', passport.authenticate('tutor', { session: false }), (req, res) => {
    const tags = req.body.tags;
    console.log(tags);
    

    Posting.find({ infoTags: { $in: tags}})
        //.skip(req.body.amountPerSet * req.body.setNumber)
        //.limit(req.body.amountPerSet)
        .then(docs => {
            return res.json(docs);
        })
        .catch(err => console.log(err));
});

router.get('/getPostings', passport.authenticate('tutor', { session: false }), (req, res) => {
    
    console.log("a")
    Posting.find()
        .then(docs => {
            return res.json(docs);
        })
        .catch(err => console.log(err));
});

//May need to secure, not sure yet
router.post('/setMatch', (req, res) => {
    
   

    Posting.findOneAndDelete({ _id: req.body.postingID })
        .then(posting => {

            // let newLesson = new Lesson({
            //     studentID: posting.studentID,
            //     tutorID: req.body.tutorID,
            //     dateAndTime: req.body.dateAndTime,
            //     subject: posting.course,
            //     tutorName: req.body.tutorName,
            //     studentName: posting.studentName,
            //     type: posting.type
            // });

            let newLessonProto = {
                studentID: posting.studentID,
                tutorID: req.body.tutorID,
                dateAndTime: req.body.dateAndTime,
                subject: posting.course,
                tutorName: req.body.tutorName,
                studentName: posting.studentName,
                type: posting.type
            }

            if(posting.type == "SINGLE_RECURRING" || posting.type == "GROUP_RECURRING") {
                newLessonProto.nextDates = req.body.nextDates;
            }

            if(posting.type == "GROUP_SINGLE" || posting.type == "GROUP_RECURRING") {
                newLessonProto.otherStudentIDs = req.body.otherStudentIDs;
            }

            const newLesson = new Lesson(newLessonProto);



            newLesson.save()
                .then(lesson => {
                    res.json(lesson);

                    
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});

router.post('/addBid', passport.authenticate('tutor', { session: false }), (req, res) => {
    let newBid = new LessonBid({
        postingID: req.body.postingID,
        tutorID: req.body.tutorID,
        tutorRating: req.body.tutorRating,
        tutorDescription: req.body.tutorDescription,
        tutorName: req.body.tutorName,
        date: req.body.date
    });

    newBid
        .save()
        .then(doc => res.json(doc))
        .catch(err => console.log(err))
})


router.post('/selectBid', passport.authenticate('user', { session: false }), (req, res) => {
    Posting.findOneAndDelete({ _id: req.body.postingID })
        .then(posting => {
            let newLessonProto = {
                studentID: posting.studentID,
                tutorID: req.body.tutorID,
                dateAndTime: req.body.dateAndTime,
                subject: posting.course,
                tutorName: req.body.tutorName,
                studentName: posting.studentName,
                type: posting.type,
                dateCreated: Date.now(),
            };

            console.log(newLessonProto)

            //Add conditions based on lesson type for now just single single

            const newLesson = new Lesson(newLessonProto);
            newLesson.save()
                .then(lesson => {
                    res.json(lesson)
                })
                .catch(err => {
                    console.log(err);

                    //maybe put posting back in the db if there is an error
                })


        })
        .catch(err => console.log(err))
});

router.post('/getBids', passport.authenticate('user', { session: false}), (req, res) => {
    LessonBid.find( { postingID: req.body.postingID } )
        .then(docs => {
            res.json(docs);
        })
        .catch(err => console.log(err))
});

//May need to secure, not sure yet
router.get('/postingByID', (req, res) => {
    const { postingID } = req.query;

    Posting.findOne({ _id: postingID })
    .then(doc => {
        if(doc) {
            res.json(doc);
        } else {
            res.status(404).json({error: "No posting found with that ID"})
        }
    })
    .catch(err => console.log(err))
})



module.exports = router;
