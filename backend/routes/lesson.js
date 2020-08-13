var express = require('express');
var router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const passport = require('passport')

const PastLesson = require("../models/PastLesson");
const LessonRequest = require("../models/LessonRequest");
const Lesson = require('../models/Lesson');
const LessonConfirm = require('../models/LessonConfirm');

const dateOptions = { month: "long", weekday: "long", day: "numeric" }
const timeOptions = { hour: "numeric", minute: "numeric" }

router.post("/addRequest", passport.authenticate('user', { session: false }), (req, res) => {

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
        description: req.body.description,
        tutorName: req.body.tutorName
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

//Authenticate for tutor, may need a seperate student one
router.get("/getRequest", passport.authenticate('tutor', { session: false }), (req, res) => {

    const id = req.query.requestID;

    LessonRequest.findOne({ _id: id})
    .then(doc => {
        res.json(doc)
    })
    .catch(err => console.log(err))
});

//May need to make for tutor and student
router.get("/lessonByID", (req, res) => {
    const { lessonID } = req.query;

    Lesson.findOne({ _id: lessonID })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => console.log(err))
});

router.get("/user/lessonByID", passport.authenticate('user', { session: false }), (req, res) => {
    
    const { lessonID } = req.query;

    Lesson.findOne({ _id: lessonID })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => console.log(err));
});

router.get("/user/lessonConfirm", passport.authenticate('user', { session: false }), (req, res) => {
    const { confirmID } = req.query;
    console.log('a');
    LessonConfirm.findOne({ _id: confirmID })
    .then(doc => {
        console.log(doc);
        res.json(doc);
    })
    .catch(err => console.log(err))
});

router.get("/tutor/lessonByID", passport.authenticate('tutor', { session: false }), (req, res) => {
    
    const { lessonID } = req.query;

    Lesson.findOne({ _id: lessonID })
    .then(doc => {
        res.json(doc)
    })
    .catch(err => console.log(err))
})

//May need to add auth/ may delete if unused
router.post("/deleteLesson", (req, res) => {
    console.log(req)
    Lesson.findOneAndDelete({ _id: req.body.lessonID })
    .then(del => {
        res.json(del);
    })
    .catch(err => console.log(err));
});

//this is no longer useful
router.post("/cancel", (req, res) => {

    let message = {
        from: "bookings@4uacademics.com",
        subject: "Lesson Cancelled"
    }

    

    Lesson.findOneAndDelete({ _id: req.body.lessonID })
    .then(del => {
        message.to = [del.studentEmail, del.tutorEmail];
        lesson.message = "The lesson on " + del.dateAndTime + " has been cancelled";

        sgMail.send(message);
    })
    .catch(err => console.log(err))
});

router.post("/student/cancel", passport.authenticate('user', { session: false }), (req, res) => {
    
    let studentMessage = {
        from: "bookings@4uacademics.com",
        subject: "Lesson Cancelled"
    }

    let tutorMessage = {
        from: "bookings@4uacademics.com",
        subject: "Lesson Cancelled"
    }

    Lesson.findOneAndDelete({ _id: req.body.studentID })
    .then(del => {
        studentMessage.to = del.studentEmail;
        studentMessage.text = "You successfully cancelled your lesson with " + del.tutorName + ". Scheduled for " + del.dateAndTime;

        tutorMessage.to = del.tutorEmail;
        tutorMessage.text = del.studentName + " Has cancelled their lesson with you scheduled for " + del.dateAndTime;

        sgMail.send(studentMessage)
        .catch(err => console.log(err))

        sgMail.send(tutorMessage)
        .catch(err => console.log(err))

        //Implement a refund aswell
    })
})

router.post("/tutor/cancel", passport.authenticate('tutor', { session: false }), (req, res) => {
    
    let studentMessage = {
        from: "bookings@4uacademics.com",
        subject: "Lesson Cancelled"
    }

    let tutorMessage = {
        from: "bookings@4uacademics.com",
        subject: "Lesson Cancelled"
    }

    Lesson.findOneAndDelete({ _id: req.body.lessonID })
    .then(del => {
        studentMessage.to = del.studentEmail;
        studentMessage.text = del.tutorName + " has cancelled your lesson on " + del.dateAndTime + ". You will recieve a refund.";

        tutorMessage.to = del.tutorEmail,
        tutorMessage.text = "Your lesson with " + del.studentName + " has been cancelled.";

        sgMail.send(studentMessage);
        sgMail.send(tutorMessage);
    })
    .catch(err => console.log(err))
});

router.get("/tutor/getPendingLessons", passport.authenticate('tutor', { session: false }), (req, res) => {
    const { tutorID } = req.query;
    console.log(tutorID);
    LessonConfirm.find({ tutorID: tutorID })
    .then(docs => {
        res.json(docs);
    })
    .catch(err => console.log(err));
});

router.post("/cancelRequest", passport.authenticate('user', { session: false }), (req, res) => {

    let message = {
        from: "bookings@4uacademics.com",
    };

    LessonRequest.findOneAndDelete({ _id: req.body.requestID })
    .then(del => {
        message.to = del.tutorEmail;
        message.text = "Your lesson request from " + del.studentName + ", has been cancelled";

        sgMail.send(message)
        .catch(err => console.log(err));

        res.status(200).json({cancelSuccess: "successfully cancelled request"});
    })
    .catch(err => console.log(err));
});

router.post("/setLessonFromConfirm", passport.authenticate('user', { session: false}), (req, res) => {
    LessonConfirm.findOneAndDelete({ _id: req.body.confirmID })
    .then(del => {
        let date = new Date(del.dateAndTime);
        let dateString = date.toLocaleDateString("en-CA", dateOptions) + ", " + date.toLocaleTimeString("en-CA", timeOptions);
        let message = {
            from: "bookings@4uacademics.com",
            to: del.tutorEmail,
            message: "The student has payed for the lesson, it is now confirmed for: " + dateString
        }

        const lessonProto = {
            studentID: del.studentID,
            tutorID: del.tutorID,
            dateAndTime: del.dateAndTime,
            subject: del.subject,
            tutorName: del.tutorName,
            studentName: del.studentName,
            type: "SINGLE_SINGLE",
            studentEmail: del.studentEmail,
            tutorEmail: del.tutorEmail,
            description: del.description
        }

        const lesson = new Lesson(lessonProto);

        lesson
        .save()
        .then(save => {
            sgMail.send(message)
            .catch(err => console.log(err))
            res.status(200).json({ lessonConfirmSuccess: "lesson confirm successful" });
        })
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
})

module.exports = router;