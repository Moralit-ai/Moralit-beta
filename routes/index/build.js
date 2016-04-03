module.exports = function(question, callback) { 


	var apiai = require('apiai');
	var app = apiai("YOUR KEY", "YOUR KEY");

		var request = app.textRequest(question);
		 
		request.on('response', function(response) {
		    var kantSucks = require('./deontologyYo')(response);
		    if(kantSucks == 0)
		    	if(response.result.metadata.speech)
		    		callback(response.result.metadata.speech)
		    	else
		    		callback("Unfortunately, I'm not smart enough to answer that question yet.")
		    else if(kantSucks == 1)
		    	callback("I'll search the web! (Still need to process using utility ethics)");
		    else
		    	callback(kantSucks)
		});
		 
		request.on('error', function(error) {
		    callback(error);
		});

		request.end()
};