var apiai = require('apiai');
var prompt = require('prompt');

 
var app = apiai("76ccb7c7acea4a6884834f6687475222", "8b3e68f16ac6430cb8c40d49c315aa7a");
 
var projectSchema = {
    properties: {
        Query: {
            message: "q",
            required: true
        }
    }
}

	prompt.get(projectSchema, function (err,result) {
		var request = app.textRequest(result.Query);
		 
		request.on('response', function(response) {
		    var kantSucks = require('./deontologyYo')(response);
		    if(kantSucks == 0)
		    	if(response.result.metadata.speech)
		    		console.log("a: " + response.result.metadata.speech)
		    	else
		    		console.log("a: Unfortunately, I'm not smart enough to answer that question yet.")
		    else if(kantSucks == 1)
		    	console.log("I'll search the web! (Still need to process using utility ethics)");
		    else
		    	console.log("a: " + kantSucks)
		});
		 
		request.on('error', function(error) {
		    console.log(error);
		});

		request.end()
	});

