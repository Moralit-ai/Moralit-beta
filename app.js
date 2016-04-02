'use strict';

var path = require('path');

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var access = require('./access');
var OptimizelyClient = require('optimizely-node-client');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./lib/config');

// Routes
var index = require('./routes/index');

var app = express();
var env;

app.use(cookieParser('123456789QWERTY'));
app.use(session(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs 
  },
  secret: '123456789QWERTY'
})));

// Set up Nunjucks
env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Global template variables
env.addGlobal('brand', config.brand);
env.addFilter('println', function(str) {
	console.log(str);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

module.exports = app;
