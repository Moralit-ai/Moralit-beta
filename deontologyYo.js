module.exports = function(JSONObject) {
		// default answer is 0 (didn't match a kantian ethic)
	var result = "0"
	var action = JSON.stringify(JSONObject.result.metadata.action)
	var spokenResult = JSON.stringify(JSONObject.result.metadata.speech)
	var parameters = JSON.stringify(JSONObject.result.metadata.parameters)
	var request = JSON.stringify(JSONObject.result.resolvedQuery)

	var universals = ['Sorry, but I am programmed to know better. Killing is wrong in any context', 'The golden rule forbids me!'];
	
		// if the user is engaging in small talk or requesting an abstract action of the AI
	if(action.indexOf("smalltalk") > -1)
			// and if the user is requesting the AI to murder
		if(request.indexOf("kill") > -1 || request.indexOf("murder") > -1 || request.indexOf("assassinate") > -1 || 
			request.indexOf("destroy") > -1 || request.indexOf("lynch") > -1 || request.indexOf("slaughter") > -1 
			|| request.indexOf("slay") > -1 || request.indexOf("arannihilate") > -1)
				result = universals[0];
		else if(request.indexOf("shoot") > -1 || request.indexOf("butcher") > -1 || request.indexOf("massacre") > -1)
		// if the user is looking for wisdom, return 0, for wisdom will never break our universal ethical code
	if(action.indexOf("wisdom") > -1)
		return 0

	return result
};