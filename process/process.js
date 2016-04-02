'use strict';

// Written by: Francesco Polizzi
// Date: December 15, 2015
// Purpose: To asynchronously make optimizely client API calls based upon the current step in the test creation.
// Input parameters: callback - a function which is executed once the asynchronous call is completed
//                   step - An integer value used to segment different calls needed at different steps in the test creation process
//                   projectID - The ID for the project selected by the user

var access = require('../access.js');
var OptimizelyClient = require('optimizely-node-client');

//Get and set API token
var API_TOKEN = access.token;
var oc = new OptimizelyClient(API_TOKEN);

//initialize JSON object
var data = [{}];

module.exports = {	
	initialize: function (callback, step, projectID, goal, audience, expTitle, editorURL, experimentURL, isRegex, pctVisitors, varTitle, varPercent, customJS, startTime, stopTime) { 
		switch(step)
		{
			case 0:
			{
				// get projects
				var projects = oc.getProjects();

				// get response from projects
				projects.done(function(projectsList) {
					var x=0;
					// for each object in the json objects array, add that object to the data array
					projectsList.forEach(function(project) {
						var projectObj = {name : project.project_name, id : project.id };
						data[x] = projectObj;
						x++;
					});
					// return projects to callback
					callback(data);
				});
				break;
			}
			case 1:
			{
				// get goals
		        var goals = oc.getGoals({
		            id: projectID
		        });

		        // get response from goals
		        goals.then(function(goalsList) {
		        	var x=0;
		        	goalsList.forEach(function(goal) {
		                var goalObj = {name : goal.title, id : goal.id};
		                data[x] = goalObj;
		                x++
		            });

			        data[x] = {name : "*", id : "*"};
			        x++;

			        // get audiences
		            var audienceList = oc.getAudiences({
		                id: projectID
		            });

		            // get response from audiences
		            audienceList.then(function(audienceList) {
			        	audienceList.forEach(function(audience) {
			                var audienceObj = {name : audience.name, id : audience.id};
			                data[x] = audienceObj;
			                x++
			            });
			            // return goals + audiences to callback
			            callback(data);
			        });
		        });
		        break;
			}
			case 4: 
			{
				console.log("Beginning build process.");

				if(isRegex == "true")
				{
					var expUrlConditions = [{
                            "match_type": "regex",
                            "value": experimentURL
                        }];
				}
				else
					var expUrlConditions = [{
                            "match_type": "simple",
                            "value": experimentURL
                        }];

                var expVariations = [""];
                var expAudienceIDs = [];

				// Create experiment
                var experimentPosted = oc.createExperiment({
                    project_id: projectID,
                    description: expTitle,
                    status: "Not started",
                    url_conditions: expUrlConditions,
                    edit_url: editorURL,
                    activation_mode: "immediate",
                    experiment_type: "ab",
                    variation_ids: expVariations
                });

                // get info for experiment just created
                experimentPosted.then(function(experimentDetails) {
                	var experimentID = experimentDetails.id;
                    expAudienceIDs[expAudienceIDs.length] = parseInt(audience);

                    // update our created experiment with these details
                    var update = oc.updateExperiment({
                        id: experimentID,
                        audience_ids: expAudienceIDs,
                        percentage_included: pctVisitors*100
                    });

                    // when we are done updating the experiment
                    update.done(function(result) { 
                    	console.log("Updated experiment...");

                    	// if we have a start or stop time to add
						if(startTime || stopTime)
                        {
							//Create schedule for experiment w/ experiment ID
							var createSchedule = oc.createSchedule({
								"stop_time": stopTime,
								"start_time": startTime,
								"experiment_id": experimentID
							});

							createSchedule.done(function(result) { console.log("Added schedule..."); });
						}

						var variationsList = oc.getVariations({
							id: experimentID
						});

						variationsList.then(function(variations) {
							console.log("Retrieved default variations...");

							variations.forEach(function(variation) {
								if(variation.description != "Original")
								var deleted = oc.deleteVariation({
									id: variation.id
								});
							});

							console.log("Deleted default variation #1...");

							var goalExpIDs = [];
							goalExpIDs[goalExpIDs.length] = experimentID;

							//post that info to optimizely
							var addGoal = oc.putGoal({
								id: goal,
								experiment_ids: goalExpIDs
							});

							addGoal.done(function(result) { 
								console.log("Added goal...");   

								var varWeight = varPercent*100;
								var varDescription = varTitle;
								var varJS = customJS || "";

								//create variation
								var createVar = oc.createVariation({
									experiment_id: experimentID,
									description: varDescription,
									weight: varWeight,
									js_component: varJS
								});
								
								createVar.done(function(result) { 
									console.log("Created variation 1..."); 

									data[0] = experimentID;

									callback(data);
								});
							});
						});
					});
				});

				break;
			}

		}
	}
};
