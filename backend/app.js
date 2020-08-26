var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
var passport = require("passport");

//const payout = require('./tasks/pay.js');

const cron = require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchingRouter = require('./routes/matchUsers');
var tutorRouter = require('./routes/tutors');
var videoChatRouter = require('./routes/videochat');
var lessonRouter = require('./routes/lesson');
var paymentRouter = require('./routes/payment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/match', matchingRouter);
app.use('/api/tutors', tutorRouter);
app.use('/api/videoChat', videoChatRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/payments', paymentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//cron.schedule("* * * * Thursday", payout());

module.exports = app;
