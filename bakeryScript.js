    //requires
var access = require('./access');
var OptimizelyClient = require('optimizely-node-client');
var prompt = require('prompt');

    //initialize experiment vars
var projectID;
var expDescription;
var expStatus = "Not started";
var expUrlConditions;
var expURL;
var expActiveMode = "immediate";
var expAudienceIDs = [];
var expVariations = [""];
var expType = "ab";
var goalExpIDs;
var numVariations;

    //Get and set API token
var API_TOKEN = access.token;
var oc = new OptimizelyClient(API_TOKEN);

var projects = oc.getProjects();

    //create JSON schema for first prompt (experiment, goal, audience)
var expSchema = {
    properties: {
        Title: {
            message: "Experiment Title",
            requred: true,
        },
        Goal: {
            /*pattern: ALL GOAL TITLES,*/
            message: "Goal ID",
            required: false
        },
        Audience: {
            /*pattern: ALL GOAL TITLES,*/
            message: "Audience ID",
            required: false
        },
        Optimizely_Test_URL: {
            message: "Editor URL",
            required: true
        },
        ExperimentURL: {
            message: "Url Target",
            required: true
        },
        Regex: {
            message: "Regex (Y/N)",
            required: true,
            pattern: /(Y|N|y|n)/
        },
        Number_Of_Variations: {
            message: "Number of Variations",
            required: true
        },
        Segment: {
            message: "Percentage of Visitors Included (0-100)",
            required: true
        }
    }
}

    //create JSON schema for 2-n variation prompt
var varSchema = {
    properties: {
        Weight: {
            message: "Percentage of Visitors (all "+numVariations+" must add up to 100)",
            required: true
        },
        Description: {
            message: "Variation Title",
            required: true
        },
        JS: {
            message: "Custom Javascript",
            required: false
        }
    }
}

    //create JSON schema for schedule prompt
var schedSchema = {
    properties: {
        Start_Time: {
            message: "Start Time",
            required: false
        },
        Stop_Time: {
            message: "Stop Time",
            required: false
        }
    }
}

    //create JSON schema for schedule prompt
var projectSchema = {
    properties: {
        ID: {
            message: "Project ID",
            required: true
        }
    }
}

projects.then(function(projectsList) {

    console.log("PROJECTS:");
    projectsList.forEach(function(project) {
        console.log("     " + project.project_name + " ID: " + project.id)
    });

    console.log("\n");

    prompt.get(projectSchema, function (err,result) { 

        projectID = result.ID;

            //get goals
        var goals = oc.getGoals({
            id: projectID
        });

            //get response from goals
        goals.then(function(goalsList) {

                //print every goal title
            console.log("PROJECT GOALS:");
            goalsList.forEach(function(goal) {
                console.log("     " + goal.title + " ID: " + goal.id);
            });

                //get audiences
            var audienceList = oc.getAudiences({
                id: projectID
            });

                //get response from audiences
            audienceList.then(function(audienceList) {
                    //print each audience name and ID
                console.log("PROJECT AUDIENCES:");
                audienceList.forEach(function(audience) {
                    console.log("     " + audience.name + " ID: " + audience.id);
                });

                console.log("\n");

                   //prompt user for experiment info
                console.log("TEST PARAMETERS:");
                prompt.start();
                prompt.get(expSchema, function (err,result) {
                    goal = result.Goal;
                    expDescription = result.Title;
                    expURL = result.Optimizely_Test_URL;
                    expAudienceIDs[expAudienceIDs.length] = parseInt(result.Audience);
                    chosenGoalID = parseInt(result.Goal);
                    percentageIncluded = result.Segment*100;
                    numVariations = result.Number_Of_Variations;

                    if(result.Regex == "Y" || result.Regex == "y")
                    {
                        expUrlConditions = [{
                            "match_type": "regex",
                            "value": result.ExperimentURL
                        }];
                    }
                    else
                    {
                        expUrlConditions = [{
                            "match_type": "simple",
                            "value": result.ExperimentURL
                        }];
                    }

                        //Create experiment
                    experimentPosted = oc.createExperiment({
                        project_id: projectID,
                        description: expDescription,
                        status: expStatus,
                        url_conditions: expUrlConditions,
                        edit_url: expURL,
                        activation_mode: expActiveMode,
                        experiment_type: "ab",
                        variation_ids: expVariations
                    });

                        //get info for experiment just created
                    experimentPosted.then(function(experimentDetails) {
                        console.log("\n");
                        console.log("Created experiment...");

                            //get id for experiment just created
                        var experimentID = experimentDetails.id;
                            //prompt user for the percentage they want to include

                            //update our created experiment with these details
                        var update = oc.updateExperiment({
                            id: experimentID,
                            audience_ids: expAudienceIDs,
                            percentage_included: percentageIncluded
                        });

                        update.done(function(result) { console.log("Updated experiment...\n");
                            console.log("EXPERIMENT SCHEUDLE");
                            console.log("Ex start/stop time: 2015-12-20T08:00:00Z");
                            prompt.get(schedSchema, function (err,result2) {


                                if(result2.Stop_Time || result2.Start_Time)
                                {
                                        //Create schedule for experiment w/ experiment ID
                                    var createSchedule = oc.createSchedule({
                                        "stop_time": result2.Stop_Time,
                                        "start_time": result2.Start_Time,
                                        "experiment_id": experimentID
                                    });

                                    createSchedule.done(function(result) { console.log("Added schedule..."); });
                                }
                            

                                variationsList = oc.getVariations({
                                    id: experimentID
                                });

                                variationsList.then(function(variations) {
                                    console.log("Retrieved default variations...");

                                    variations.forEach(function(variation) {
                                        var deleted = oc.deleteVariation({
                                            id: variation.id
                                        });
                                    });

                                    console.log("Deleted default variations...");

                                        //get the array of experiments for the goal we would like
                                    goalsList.forEach(function(goal) {
                                        if(goal.id = chosenGoalID)
                                        {
                                            goalExpIDs = goal.experiment_ids;
                                        }
                                    });

                                        //append our experiment ID to the end of that array of experiments
                                    goalExpIDs[goalExpIDs.length] = experimentID;

                                        //post that info to optimizely
                                    var addGoal = oc.putGoal({
                                        id: chosenGoalID,
                                        experiment_ids: goalExpIDs
                                    });

                                    addGoal.done(function(result) { 
                                        console.log("Added goal...\n");    

                                        console.log("DEFAULT VARIATION AMT: 2");
                                        console.log("VARIATION 1 PARAMETERS:");
                                        prompt.get(varSchema, function (err,result3) {
                                                //prompt user for the variation information
                                            var varWeight = result3.Weight*100;
                                            var varDescription = result3.Description;
                                            var varJS = result3.JS || "";

                                                //create variation
                                            var createVar = oc.createVariation({
                                                experiment_id: experimentID,
                                                description: varDescription,
                                                weight: varWeight,
                                                js_component: varJS
                                            });
                                            createVar.done(function(result) { 
                                                console.log("Created variation 1..."); 
                                                prompt.get(varSchema, function (err,result4) {
                                                        //prompt user for the variation information
                                                    varWeight = result4.Weight*100;
                                                    varDescription = result4.Description;
                                                    varJS = result4.JS || "";

                                                        //create variation
                                                    var createVar2 = oc.createVariation({
                                                        experiment_id: experimentID,
                                                        description: varDescription,
                                                        weight: varWeight,
                                                        js_component: varJS
                                                    });
                                                    createVar2.done(function(result) {console.log("Created variation 2..."); });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }); 
                    });
                });
            });
        });
    });
});
