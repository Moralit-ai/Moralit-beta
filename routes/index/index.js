'use strict';

var express = require('express');
var router = express.Router();

var stepAPI = 0;
var stepPage = 0;
var title= "MORALIT.ai";

var userRequestsArray = [];

// requesting root directory
router.get('/', function(request, response) {
	//console.log("index.html woo");
	if(request.body.userInput)
		userRequestsArray.push(request.body.userInput);
	response.render('index.html', {request_history: userRequestsArray});
});

router.post('/', function(request, response) {
	require('./build')(request.body.userInput, function(answer) {
		// request.body.userInput is from the user... pass the info back here
		response.send(answer)
		//response.render('index.html', {request_history: userRequestsArray});
	});
});

module.exports = router;
