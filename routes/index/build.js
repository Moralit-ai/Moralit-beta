module.exports = function(question, callback) { 


	var apiai = require('apiai');
	var app = apiai("76ccb7c7acea4a6884834f6687475222", "8b3e68f16ac6430cb8c40d49c315aa7a");

		var request = app.textRequest(question);
		 
		request.on('response', function(response) {
		    var kantSucks = require('./deontologyYo')(response);
		    if(kantSucks == 0)
		    	if(response.result.metadata.speech)
		    		callback(response.result.metadata.speech)
		    	else
		    		callback("Unfortunately, I'm not smart enough to answer that question yet.")
		    else if(kantSucks == 1)
		    	if(response.result.metadata.speech && response.result.metadata.speech != "undefined")
		    	callback("I'll check with that after I pass through my utility ethic function. Heres what I would say otherwise: " + response.result.metadata.speech);
		    else
		    	callback(kantSucks)
		});
		 
		request.on('error', function(error) {
		    callback(error);
		});

		request.end()
};