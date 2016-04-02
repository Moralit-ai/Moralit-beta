'use strict';

var access = require('./access.js');
var OptimizelyClient = require('optimizely-node-client');

//Get and set API token
var API_TOKEN = access.token;
var oc = new OptimizelyClient(API_TOKEN);

//initialize JSON object
var data = [{}];

var projects = oc.getProjects();


module.exports = {	
	initialize: function (callback) { 
		projects.done(function(projectsList) {
			var x=0;
		    projectsList.forEach(function(project) {
		    	var projectObj = {name : project.project_name, id : project.id };
		    	data[x] = projectObj;
		    	x++;
		    });
		    callback(data);
		});
	}
};
