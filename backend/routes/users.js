var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Posting = require('../models/Posting');
const PastLesson = require("../models/PastLesson");
const LessonRequest = require("../models/LessonRequest");


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({ email: "Account with that email already exists"});
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          dateOfBirth: req.body.dateOfBirth
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if(!user) {
        return res.status(400).json({ emailNotFound: "The email entered does not exist"});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              authLevel: user.authLevel
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
            return res.status(400).json({ passwordIncorrect: "Password incorrect" });
          }
        });
    });
});

router.post('/getLessons', (req, res) => {
  console.log(req);
  Lesson.find({ studentID: req.body.studentID })
    .then(docs => {
      if(docs) {
        return res.json(docs);
      } else {
        return res.status(400).json({ noLessonsFound: "You have no Lessons" });
      }
    })
    .catch(err => console.log(err));
});

//Will probably have to change to a get method along with other routes
router.post('/getPostings', (req, res) => {
  Posting.find({ studentID: req.body.studentID })
    .then(docs => {
      if(docs) {
        return res.json(docs);
      } else {
        return res.status(400).json({ noPostingsFound: "You have no postings made from this account"});
      }
    })
    .catch(err => console.log(err))
});

router.post('/deletePosting', (req, res) => {
  Posting.findOneAndDelete({ _id: req.body.postingID })
    .then(del => {
      res.json(del);
    })
    .catch(err => console.log(err));
});

router.post('/findUserByEmail', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(doc => {
      if(doc) {
        return res.json(doc);
      } else {
        return res.status(400).json({ userNotFound: "The user with that email address does not exist"});
      }
      
      
    })
    .catch(err => {
      console.log(err);
    })
})

router.get("/getPastLessons", (req, res) => {
  PastLesson.find({ studentID: req.query.studentID })
    .then(docs => {
      if(docs) {
        return res.json(docs)
      } else {
        return res.status(400).json({ noPastLessons: "You have no past lessons"})
      }
    })
    .catch(err => console.log(err))
});

router.get("/getRequests", (req, res) => {
  
  LessonRequest.find({ studentID: req.query.studentID })
    .then(docs => {
      if(docs.length > 0) {
        res.json(docs);
      } else {
        res.status(404).json({ noRequestsFound: "No Lesson Requests found"})
      }
    })
    .catch(err => console.log(err))

});

router.post("/lessonOver", (req, res) => {
  PastLesson.findOne({ lessonID: req.body.lessonID })
  .then(doc => {
    doc.studentExitTime = Date.now();
    doc.save()
    .then(save => {
      res.json(save);
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
});

module.exports = router;
