module.exports = function(question) { 

	var apiai = require('apiai');
	var app = apiai("76ccb7c7acea4a6884834f6687475222", "8b3e68f16ac6430cb8c40d49c315aa7a");

	var request = app.textRequest(question)
		
	request.on('response', function (response) {
	var kantSucks = require('./deontologyYo')(response);
	if(kantSucks == 0)
		if(response.result.metadata.speech)
		   	return "a: " + response.result.metadata.speech
		else
		   	return " Unfortunately, I'm not smart enough to answer that question yet."
		else if(kantSucks == 1)
		   	return "I'll search the web! (Still need to process using utility ethics)"
		else
	    	return kantSucks
	});
};