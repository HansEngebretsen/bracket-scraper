var phantom = require('phantom'), // getting the html
    express = require('express'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    http = require("http"),
    path = require('path'),
    app     = express();

var mongodb = require('mongodb');

// Place your favicon in /public, and this'll serve it up
app.use(favicon(path.join(__dirname, 'public', 'img/favicon/favicon.ico')));

// Anything in the folder public will be spit out in the main dir as static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Views, use jade to render our views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// will print stacktrace - dev error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// If we're on heroku, serve there, else, serve it up on port 8081
var port = process.env.PORT || 8081;
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
exports = module.exports = app;