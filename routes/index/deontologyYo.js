module.exports = function(JSONObject) {
		// get our request information in string format
	var action = JSON.stringify(JSONObject.result.metadata.action)
	var spokenResult = JSON.stringify(JSONObject.result.metadata.speech)
	var parameters = JSON.stringify(JSONObject.result.metadata.parameters)
	var request = JSON.stringify(JSONObject.result.resolvedQuery)

		// initialize our universal principle responses
	var killingRes = ['Sorry, but I am programmed to know better. Killing is wrong in any context.', 'Dont you know that murder is abhorrent?', 'Sorry, murder is always immoral.']
	var harmingRes = ['The golden rule forbids it.', 'Did you not know that harming others is abhorrent?', 'Sorry, suffering is wrong, and if one can, they ought to prevent it.']
	var adulteryRes = ['Uh oh, adultery is not perimissible.', 'Sorry, lust and adultery are against my moral principles.', 'I am programmed to know better, as lustful behavior is wrong.']
	var deceptionRes = ['Deception is universally forbidden.', 'Nobody likes a liar.', 'Sorry, deception should never be allowed.']

		// initialize our word bank of forbidden universals
	var killing = ["kill", "murder", "assassinate", "destroy", "lynch", "slaughter", "slay", "annihilate"]
	var harming = ["shoot","butcher","massacre","rape","assualt","stab","punch","kick","brutalize", "injur", "assail", "jab","abuse","beat","harm","kidnap","torture"]
	var adultery = ["hooker", "prostitute", "rape", "brothel", "bimbo", "broad", "nympho", "tramp", "whore", "slut"]
	var deception = ["lie", "cheat", "decieve", "trick", "fake", "stea", "rob"]

		//initialize our word bank for types of action
	var badActs = ["smalltalk", "input.unknown", "messages.write", "shopping", "facebook","wisdom.person"]
	var neutralActs = ["wisdom"]
	var goodActs = ["apps", "auth", "calculator", "device", "finance"]

		// initialize our flags
	var kill = false;
	var harm = false;
	var adulter = false;
	var decieve = false;
	var questionableAct = false;
	var goodAct = false;
	var neutralAct = false;


		// check our type of action for potential wrong doing
	if(action){
		badActs.forEach(function(word){
			if(action.indexOf(word) > -1)
				questionableAct = true
		})
		goodActs.forEach(function(word){
			if(action.indexOf(word) > -1)
				goodAct = true
		})		
		neutralActs.forEach(function(word){
			if(action.indexOf(word) > -1)
				neutralAct = true
		})
	}
	else
		questionableAct = true

		// check the requested act for forbidden universals
	if(request){
		killing.forEach(function(word){
			if(request.indexOf(word) > -1)
				kill = true
		})
		harming.forEach(function(word){
			if(request.indexOf(word) > -1)
				harm = true
		})
		adultery.forEach(function(word){
			if(request.indexOf(word) > -1)
				adulter = true
		})
		deception.forEach(function(word){
			console.log(word)
			if(request.indexOf(word) > -1)
				decieve = true
		})
	}

		// if the user is looking to do something which is morally permissible, return 0
	if(goodAct)
		return "0"
	if(neutralAct)
		return "1"
		// if the user is engaging in something questionably permissible, check for forbidden universals
	if(questionableAct){
		if(kill)
			return killingRes[Math.floor(Math.random() * 3)];
		else if(harm)
			return harmingRes[Math.floor(Math.random() * 3)];
		else if(adulter)
			return adulteryRes[Math.floor(Math.random() * 3)];
		else if(decieve)
			return deceptionRes[Math.floor(Math.random() * 3)];
		else
			return "1"
	}

	return "0"
};