var express = require('express');
var router = express.Router();
const Twilio = require('twilio');
const Chance = require('chance');
const PastLesson = require('../models/PastLesson')
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const ChatGrant = AccessToken.ChatGrant;
const chance = new Chance();
require('dotenv').config();
const MAX_ALLOWED_SESSION_DURATION = 600;
const passport = require('passport')
const twilioAccountSid = "AC8d375bf13d9b646c025c81e3dbdcbb55";
const twilioApiKeySID = "SK966cf784b93e9e190d48fbe05961b51d";
const twilioApiKeySecret = "xtOBNbBdqoZ7eMVJUTkr22ifug1C35p2";
const twilioChatServiceSid = "IS4175ba1398fd4068b47259a25df0eb0d";

router.post('/token', (req, res) => {

    console.log(twilioAccountSid);
    //const { identity, roomName } = req.query;

    const { identity, lessonID } = req.body;

    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
        ttl: MAX_ALLOWED_SESSION_DURATION,
    });

    token.identity = identity;
    const videoGrant = new VideoGrant({ room: lessonID });

    token.addGrant(videoGrant);

    PastLesson.findOne({ lessonID: req.body.lessonID })
    .then(doc => {
        if(doc) {
            if(req.body.studentID) {

                doc.studentID = req.body.studentID;
                doc.studentName = req.body.studentName;
                doc.studentEmail = req.body.studentEmail;
                doc.studentJoinTime = Date.now();

                doc.save()
                .then(save => {
                    console.log(save);
                })
                .catch(err => console.log(err))

            } else if(req.body.tutorID) {
                doc.tutorID = req.body.tutorID;
                doc.tutorName = req.body.tutorName;
                doc.tutorEmail = req.body.tutorEmail;
                doc.tutorJoinTime = Date.now();

                doc.save()
                .then(save => {
                    console.log(save);
                })
                .catch(err => console.log(err))

            }

        } else if(req.body.studentID) {
            const submissionData = {
                lessonID: req.body.lessonID,
                subject: req.body.subject,
                studentJoinTime: Date.now(),
                startTime: req.body.startTime,
                studentID: req.body.studentID,
                studentName: req.body.studentName,
                studentEmail: req.body.studentEmail
            }

            const pastLesson = new PastLesson(submissionData);
            pastLesson.save()
            .then(save => {
                console.log(save);
            })
            .catch(err => console.log(err))
            
        } else if(req.body.tutorID) {
            const submissionData = {
                lessonID: req.body.lessonID,
                subject: req.body.subject,
                tutorJoinTime: Date.now(),
                startTime: req.body.startTime,
                tutorID: req.body.tutorID,
                tutorName: req.body.tutorName,
                tutorEmail: req.body.tutorEmail
            }

            const pastLesson = new PastLesson(submissionData);
            pastLesson.save()
            .then(save => {
                console.log(save);
            })
            .catch(err => console.log(err))

        }
    })

    res.send(token.toJwt());
    console.log('issued token for: ' + identity + 'for room: ' + roomName);
}); 

router.post('/user/token', passport.authenticate('user', { session: false }), (req, res) => {
    const { identity, lessonID } = req.body;

    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
        ttl: MAX_ALLOWED_SESSION_DURATION,
    });

    token.identity = identity;
    const videoGrant = new VideoGrant({ room: lessonID });

    token.addGrant(videoGrant);

    PastLesson.findOne({ lessonID: req.body.lessonID })
    .then(doc => {
        if(doc) {
            doc.studentID = req.body.studentID;
            doc.studentName = req.body.studentName;
            doc.studentEmail = req.body.studentEmail;
            doc.studentJoinTIme = Date.now();

            doc.save()
            .then(save => {
                res.send(token.toJwt());
                console.log('issued token for: ' + identity + 'for room: ' + roomName);
                console.log(save);
            })
            .catch(err => console.log(err))
        } else {
            const submissionData = {
                lessonID: req.body.lessonID,
                subject: req.body.subject,
                studentJoinTime: Date.now(),
                startTime: req.body.startTime,
                studentID: req.body.studentID,
                studentName: req.body.studentName,
                studentEmail: req.body.studentEmail
            }

            const pastLesson = new PastLesson(submissionData);
            pastLesson.save()
            .then(save => {
                res.send(token.toJwt());
                console.log('issued token for: ' + identity + 'for room: ' + roomName);
                console.log(save);
            })
            .catch(err => console.log(err))
        }
    })
});

router.post('/tutor/token', passport.authenticate('tutor', { session: false }), (req, res) => {

    const { identity, lessonID } = req.body;

    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
        ttl: MAX_ALLOWED_SESSION_DURATION,
    });

    token.identity = identity;
    const videoGrant = new VideoGrant({ room: lessonID });

    token.addGrant(videoGrant);

    PastLesson.findOne({ lessonID: req.body.lessonID })
    .then(doc => {
        if(doc) {
            doc.tutorID = req.body.tutorID;
            doc.tutorName = req.body.tutorName;
            doc.tutorEmail = req.body.tutorEmail;
            doc.tutorJoinTime = Date.now();

            doc.save()
            .then(save => {
                res.send(token.toJwt());
                console.log('issued token for: ' + identity + 'for room: ' + roomName);
                console.log(save);
            })
            .catch(err => console.log(err));
        } else {
            const submissionData = {
                lessonID: req.body.lessonID,
                subject: req.body.subject,
                tutorJoinTime: Date.now(),
                startTime: req.body.startTime,
                tutorID: req.body.tutorID,
                tutorName: req.body.tutorName,
                tutorEmail: req.body.tutorEmail
            }

            const pastLesson = new PastLesson(submissionData);
            pastLesson.save()
            .then(save => {
                res.send(token.toJwt());
                console.log('issued token for: ' + identity + 'for room: ' + roomName);
                console.log(save);
            })
            .catch(err => console.log(err))
        }
    })

});



router.get("/chatToken", (req, res) => {
    const token = new AccessToken(
        twilioAccountSid, twilioApiKeySID, twilioApiKeySecret
    );

    token.identity = chance.name();
    token.addGrant(new ChatGrant({
        serviceSid: twilioChatServiceSid
    }))

    res.send({
        identity: token.identity,
        jwt: token.toJwt()
    });
});

module.exports = router;