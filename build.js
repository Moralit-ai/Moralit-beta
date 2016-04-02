var apiai = require('apiai');
var prompt = require('prompt');

 
var app = apiai("76ccb7c7acea4a6884834f6687475222", "8b3e68f16ac6430cb8c40d49c315aa7a");
 
var projectSchema = {
    properties: {
        Query: {
            message: "What do you want lil bish",
            required: true
        }
    }
}

	prompt.get(projectSchema, function (err,result) {
		var request = app.textRequest(result.Query);
		 
		request.on('response', function(response) {
		    console.log(response);

		    var kantSucks = require('./deontologyYo')(response);
		    console.log("\n\n--------- RESULT FROM KANT ----------");
		    console.log(kantSucks);
		});
		 
		request.on('error', function(error) {
		    console.log(error);
		});

		request.end()
	});

