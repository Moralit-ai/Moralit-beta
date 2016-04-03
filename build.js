module.exports = function(reponse) { 

	var apiai = require('apiai');
	var app = apiai("your key", "your key");
		
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