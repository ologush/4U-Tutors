var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


const PastLesson = require("../models/PastLesson");
const LessonRequest = require("../models/LessonRequest");

router.post("/addRequest", (req, res) => {

    let message = {
        to: req.body.tutorEmail,
        from: 'bookings@4uacademics.com',
        subject: 'Request for a Lesson',
        text: 'You have a request from a lesson: \n' + req.body.description 
    };

    const submissionData = {
        studentID: req.body.studentID,
        tutorID: req.body.tutorID,
        studentName: req.body.studentName,
        studentEmail: req.body.studentEmail,
        tutorEmail: req.body.tutorEmail,
        availableTimes: req.body.availableTimes,
        course: req.body.course,
        description: req.body.description
    };

    const newRequest = new LessonRequest(submissionData);

    newRequest
    .save()
    .then(doc => {
        message.html = "<a href='" + "https://tutor.4uacademics.com/request/" + doc._id + "'>Click here to see the request</a>"
        sgMail.send(message)
        .catch(err => console.log(err))
        res.json(doc);
    })
    .catch(err => console.log(err))
            

});

router.get("/getRequest", (req, res) => {

    const id = req.query.requestID;

    LessonRequest.findOne({ _id: id})
    .then(doc => {
        res.json(doc)
    })
    .catch(err => console.log(err))
})



module.exports = router;