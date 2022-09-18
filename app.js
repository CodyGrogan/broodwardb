var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
require('dotenv').config();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "https://firebase.googleapis.com/v1alpha/projects/-/apps/1:476750257135:web:424f4f692c1fc7d70db41a/webConfig", "https://www.google-analytics.com/g/collect?v=2&tid=G-CM92DC59TV&gtm=2oe9e0&_p=2072745683&_fid=dqQ-aSE6Ga7qSpcJzNaSqV&cid=429162323.1658702260&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=1&sid=1663522561&sct=11&seg=1&dl=http%3A%2F%2Flocalhost%2F&dt=Brood%20War%20DB&en=page_view&_ee=1&ep.origin=firebase"],
    scriptSrc: ["'self'", "https://ajax.googleapis.com", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js", "https://www.googletagmanager.com/gtag/js?l=dataLayer&id=G-CM92DC59TV"],
  },
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/', indexRouter);



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

module.exports = app;
