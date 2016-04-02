'use strict';

var express = require('express');
var router = express.Router();

var stepAPI = 0;
var stepPage = 0;
var title= "MORALIT.ai";

var userRequestsArray = [];

// requesting root directory
router.get('/', function(request, response) {
	console.log("index.html woo");
	response.render('index.html', {request_history: userRequestsArray});
});

router.post('/', function(request, response) {
	var userInput = request.body.moral_form_input;

	//var result = require('./processEthics')(userInput);

	if (userInput.length > 0) {
		userRequestsArray.push(userInput);
	}
	response.render('index.html', {request_history: userRequestsArray});
});

































// requesting expDetails page
router.get('/expDetails', function(request, response) {
	console.log("test");
	if(request.session.lastPage)
	{
		if(request.session.lastPage == "index")
		{
			// set the step for the API process
			stepAPI = 1;

			// store that project in memory
			var ProjID = request.query.projects;
			request.session.projectID = request.query.projects;

			// render our page with projects, chosen project, and step
			require('../../process/process.js').initialize(function (goalAudience) {
				// set the step for the API process
				stepAPI = 2;

				// parse goalAudience for our separated goals and audiences
				request.session.goals = parseGoals(goalAudience);
				request.session.audiences = parseAudiences(goalAudience);

				// render the page
				response.render('expDetails.html', {step: stepAPI, audiences: request.session.audiences, goals: request.session.goals,
					exptitle: request.session.expTitle,
					editorURL: request.session.editorURL, 
					experimentURL: request.session.experimentURL,
					isRegex: request.session.isRegex, 
					pctVisitors: request.session.pctVisitors, 
					title: title, brand: brand
				});
				request.session.lastPage = "/expDetails";
				stepPage = 2;
			}, 
			stepAPI, 
			request.session.projectID);
		}
		else
		{
			if(request.session.lastPage == "/advDetails")
			{
				// render the page
				response.render('expDetails.html', {step: stepAPI, audiences: request.session.audiences, goals: request.session.goals, chosenAudience: request.session.audience, chosenGoal: request.session.goal,
					exptitle: request.session.expTitle,
					editorURL: request.session.editorURL, 
					experimentURL: request.session.experimentURL,
					isRegex: request.session.isRegex, 
					pctVisitors: request.session.pctVisitors, 
					title: title, brand: brand
				});
				request.session.lastPage = "/expDetails";
				stepPage = 2;
			}
			else
			{
				response.redirect(301, "/");
			}
		}
	}
	else
	{
		response.redirect(301, "/");
	}

	// set the page step
});

router.get('/advDetails', function(request, response) {	
	if(request.session.lastPage && request.session.lastPage == "/expDetails")
	{
		stepAPI = 3;
		// get querystring parameters from our form submit and store them in the session
		request.session.expTitle = request.query.exptitle;
		request.session.editorURL = request.query.editorURL;
		request.session.experimentURL = request.query.experimentURL;
		request.session.isRegex = request.query.isRegex;
		request.session.pctVisitors = request.query.pctVisitors;
		// we will default the number of variations to 2 for right now
		// request.session.numVariations = request.query.numVariations;
		request.session.audience = request.query.audience;
		request.session.goal = request.query.goals;

		console.log("experiment title: " +request.session.expTitle);

		// render the page
		response.render('advDetails.html', {step: stepAPI, 
						vartitle: request.session.varTitle,
						varPercent: request.session.varPercent,
						customJS: request.session.customJS,
						startTime: request.session.startTime,
						stopTime: request.session.stopTime, 
						title: title, brand: brand
			});

		request.session.lastPage = "/advDetails";

		stepPage = 3;
	}
	else
	{
		if(request.session.lastPage == "/confirm")
		{
			stepAPI = 3;
			// render the page
			response.render('advDetails.html', {step: stepAPI, 
							vartitle: request.session.varTitle,
							varPercent: request.session.varPercent,
							customJS: request.session.customJS,
							startTime: request.session.startTime,
							stopTime: request.session.stopTime,
							title: title, brand: brand
				});

			request.session.lastPage = "/advDetails";

			stepPage = 3;
		}
		else
		{
			response.redirect(301, "/");
		}
	}

});

router.get('/confirm',function(request, response) {
	if(request.session.lastPage == "/advDetails")
	{
		// get querystring parameters from our form submit and store them in the session
		request.session.varTitle = request.query.vartitle;
		request.session.varPercent = request.query.varPercent;
		request.session.customJS = request.query.customJS;
		request.session.startTime = request.query.startTime;
		request.session.stopTime = request.query.stopTime;

		console.log("experiment title: " + request.session.expTitle);

		response.render('confirm.html', {audiences: request.session.audiences, goals: request.session.goals, chosenAudience: request.session.audience, chosenGoal: request.session.goal,
						exptitle: request.session.expTitle,
						editorURL: request.session.editorURL, 
						experimentURL: request.session.experimentURL,
						isRegex: request.session.isRegex, 
						pctVisitors: request.session.pctVisitors,
						projects: request.session.projects, 
						chosenProj: request.session.projectID,
						vartitle: request.session.varTitle,
						varPercent: request.session.varPercent,
						customJS: request.session.customJS,
						startTime: request.session.startTime,
						stopTime: request.session.stopTime,
						title: title, brand: brand
					});

		request.session.lastPage = "/confirm";
	}
	else
	{
		response.redirect(301, "/");
	}
});

router.get('/success',function(request, response) {
	if(request.session.lastPage == "/confirm")
	{
		stepAPI = 4;

		require('../../process/process.js').initialize(function (data) {
			var testURL = "https://app.optimizely.com/edit?experiment_id=" + data[0];

			response.render('success.html', {testURL: testURL, title: title, brand: brand});
		}, 
		stepAPI, 
		request.session.projectID, 
		request.session.goal, 
		request.session.audience, 
		request.session.expTitle, 
		request.session.editorURL, 
		request.session.experimentURL,
		request.session.isRegex, 
		request.session.pctVisitors,
		request.session.varTitle,
		request.session.varPercent,
		request.session.customJS,
		request.session.startTime,
		request.session.stopTime);
	}
	else
	{
		response.redirect(301, "/");
	}
});

// parseGoals function
// Purpose: To parse our goalAudience array for values (our goals) before our sentinal (*)
function parseGoals(goalAudience)
{
	var goals = [];

	for(var x=0; x<goalAudience.length; x++) {
        if(goalAudience[x].name == "*")
        {
        	return goals;
        }
        else
        {
        	goals.push(goalAudience[x]);
        }
    }

	return goals;
}

// parseGoals function
// Purpose: To parse our goalAudience array for values (our audiences) after our sentinal (*)
function parseAudiences(goalAudience)
{
	var audiences = [];
	var isAudiences = false;

	for(var x=0; x<goalAudience.length; x++) {
        if(goalAudience[x].name == "*")
        {
        	isAudiences = true;
        }
        else
        {
        	if(isAudiences) {
        		audiences.push(goalAudience[x]);
        	}
        }
    }

	return audiences;
}

module.exports = router;
