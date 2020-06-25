var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


const Tutor = require('../models/Tutor');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Posting = require('../models/Posting');

//Add input validation

const validateLoginInput = require("../validation/login");

router.post('/register', (req, res) => {
    Tutor.findOne({ email: req.body.email })
        .then(tutor => {
            if(tutor) {
                return res.status(400).json({ email: "Account with this email already exists"});
            } else {
                const newTutor = new Tutor({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
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
                                email: tutor.email
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



module.exports = router;