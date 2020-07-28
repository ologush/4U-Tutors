var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const axios = require("axios")

const Tutor = require('../models/Tutor');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Posting = require('../models/Posting');
const TutorFeedback = require('../models/TutorFeedback');
const LessonRequest = require('../models/LessonRequest');
const LessonConfirm = require('../models/LessonConfirm');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

//Add input validation

const validateLoginInput = require("../validation/login");
const stripe = require('stripe')('sk_test_51H7oaAFvYqAjSG5imIW7Qg7F7Bb1yGe1uzadP4YECJfhJzZwfQ09NUUo3odus744L9hvZTmeR0nKOV6TbhTFfUOF002jruSSFo');

router.post('/register', (req, res) => {
    Tutor.findOne({ email: req.body.email })
        .then(tutor => {
            if(tutor) {
                return res.status(400).json({ email: "Account with this email already exists"});
            } else {
                const newTutor = new Tutor({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    description: req.body.description
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newTutor.password, salt, (err, hash) => {
                        if(err) throw err;
                        newTutor.password = hash;
                        newTutor
                            .save()
                            .then(tutor => res.json(tutor))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
});

//add input validation
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    

    const email = req.body.email;
    console.log(req.body.email);
    const password = req.body.password;

    Tutor.findOne({ email: email })
        .then(tutor => {
            if(tutor) {
                bcrypt.compare(password, tutor.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: tutor.id,
                                name: tutor.name,
                                email: tutor.email,
                                rating: tutor.rating,
                                description: tutor.description
                            };
    
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {
                                    expiresIn: 86400
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        } else {
                            console.log("Password incorrect");
                            return res.status(400).json({ passwordIncorrect: "Password was Entered incorrectly"});
                        }
                        
                    });
            } else {
                console.log("email incorrect");
                return res.status(400).json({ tutorNotFound: "No account with this email exists"});
            }
        });
});

router.post('/getLessons', (req, res) => {

    
    Lesson.find({ tutorID: req.body.tutorID})
        .then(docs => {
            if(docs) {
                console.log(docs);
                return res.json(docs);
            } else {
                return res.status(400).json({ noLessonsFound: "You have no lessons"})
            }
        })
        .catch(err => console.log(err));
});

router.post('/giveFeedback', (req, res) => {
    

    if(req.body.feedback) {
        feedbackProto.feedback = req.body.feedback
    };
    //Still gotta update the tutors overall rating
    Lesson.findOne({ _id: req.body.lessonID })
        .then(lesson => {
            if(lesson) {
                console.log(lesson)
                const feedbackProto = {
                    tutorID: lesson.tutorID,
                    rating: req.body.rating,
                }

                if(req.body.feedback) {
                    feedbackProto.feedback = req.body.feedback;
                };

                console.log(feedbackProto)

                tutorFeedback = new TutorFeedback(feedbackProto);

                tutorFeedback.save()
                .then(feedback => res.json(feedback))
                .catch(err => console.log(err))

            }
        })
        .catch(err => console.log(err))
});

router.get("/findByEmail", (req, res) => {
    console.log(req.query)
    Tutor.findOne({ email: req.query.email})
        .then(doc => {
            if(doc) {
                res.json(doc);
            } else {
                res.status(404).json({noAccountFound: "No Tutor Found"})
            }
        })
        .catch(err => console.log(err))
});

router.get("/getRequests", (req, res) => {
    
    LessonRequest.find({ tutorID: req.query.tutorID })
        .then(docs => {
            if(docs.length > 0) {
                res.json(docs);
            } else {
                res.status(404).json({ noRequestsFound: "No Lesson Requests Found" })
            }
        })
        .catch(err => console.log(err))

});

router.post("/acceptRequest", (req, res) => {
    console.log(req.body);
    let submissionData = {
        studentID: req.body.studentID,
        tutorID: req.body.tutorID,
        dateAndTime: req.body.dateAndTime,
        subject: req.body.subject,
        tutorName: req.body.tutorName,
        studentName: req.body.studentName,
        type: req.body.type,
        tutorEmail: req.body.tutorEmail
    };

    console.log(submissionData);

    let message = {
        to: req.body.studentEmail,
        from: 'bookings@4uacademics.com',
        subject: "Lesson Request Accepted",
        text: "Your request for a lesson has been accepted for: " + req.body.dateAndTime
    }

    const newLessonConfirm = new LessonConfirm(submissionData);

    newLessonConfirm
    .save()
    .then(doc => {
        console.log(doc)
        message.html = "<a href='https://www.4uacademics.com/payment/" + doc._id + "'>Pay Here to Confirm the Lesson</a>"
        sgMail.send(message)
        .catch(err => console.log(err));

        LessonRequest.findOneAndDelete({ _id: req.body.requestID })
        .then(del => console.log(del))
        .catch(err => console.log(err));

        res.json(doc);
    })
    .catch(err => console.log(err))
});

router.post("/denyRequest", (req, res) => {

    console.log(req.body.requestID);
    
    // LessonRequest.fineOneAndDelete({ _id: req.body.requestID })
    // .then(doc => {
    //     console.log("a");
    //     let message = {
    //         to: doc.studentEmail,
    //         from: 'bookings@4uacademics.com',
    //         subject: 'Lesson Request Declined',
    //         text: 'Your lesson request has been declined'
    //     }

    //     //sgMail.send(message)
    //     //.catch(err => console.log(err));
    //     res.json(doc);
    // })
    // .catch(err => console.log(err))
    const requestID = req.body.requestID;
    // LessonRequest.findOne({ _id: req.body.requestID })
    // .then(doc => {
    //     console.log(doc);
    //     res.json(doc)
    // })
    // .catch(err => console.log(err))

    LessonRequest.findByIdAndDelete(requestID)
    .then(doc => {
        res.json(doc);

    })
    .catch(err => console.log(err));

});

router.post("/addStripe", async (req, res) => {
    console.log(req.body);
    const { code, tutorID } = req.body;
    console.log(code)

    const response = await stripe.oauth.token({
        grant_type: 'authorization_code',
        code: code
    });

    console.log(response);

    Tutor.findOneAndUpdate({ _id: tutorID }, { stripeID: response.stripe_user_id })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => console.log(err))

});


module.exports = router;