var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./routes/index');
var fetchNearYou = require('./routes/fetchNearYou');
var fetchPopular = require('./routes/fetchPopular');
var fetchWorldwide = require('./routes/fetchWorldwide');
var search = require('./routes/search');
var like = require('./routes/like');


var app = express();

//start DB
var mongoose = require('mongoose');
var mongopath = require('./mongopath.js');
mongoose.connect(mongopath);

//to get IP
var requestIp = require('request-ip');
app.use(requestIp.mw());

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');


//allow cross orgins for development
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./static/build'));

//app.use('/', index);
app.use('/search', search);
app.use('/fetchNearYou', fetchNearYou);
app.use('/fetchPopular', fetchPopular);
app.use('/fetchWorldwide', fetchWorldwide);
app.use('/like', like);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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