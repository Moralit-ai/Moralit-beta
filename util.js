var mysql = require('mysql');

var found=0;
var breaker;
var conceptName = [];
var answeryo= 0;
var util = function (AYLIENTextAPI, textapi){};

util.prototype.log = function (){
	console.log('testing yo');
};

util.prototype.answer = function(response, textapi){
	var resolvedQuery = response.result.resolvedQuery;

	 

	    //SECOND API CALL
	    var xx= 0;
	    	textapi.concepts({ text: resolvedQuery }, function(error, response) {
	  if (error === null) {
	    Object.keys(response.concepts).forEach(function(concept) {
	       var surfaceForms = response.concepts[concept].surfaceForms.map(function(sf) {
	        return sf['string'];
	      });
	      
	          		
	      //SECOND CALL VARIABLES
	      var surf = surfaceForms;
	      surfaceForms.forEach(function(value){
	      	conceptName[xx]= value;
	      	console.log("concept name "+ value);
	      	xx++;

	      });
	      });


		var connection = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "Solonalakes",
		  port: 3307,
		  database: "sys"
		});


		connection.connect();


		connection.query('SELECT * FROM sys.db',function(err,rows){
			  if(err) throw err;

	//searching all questions

			for(n in conceptName){

			  for (var i = 0; i < rows.length; i++) {

			  	if(rows[i].question.toLowerCase().indexOf(conceptName[n].toLowerCase())>=0){
			  		//FOUND IN DB
			  			found=1;
			  			console.log("FOUND IN DB: "+ found );
			  			answeryo = rows[i].answer;
			  			
			  			console.log(answeryo); //THIS WILL BE THE ANSWER!
			  			break;
					}
				};
				
				if(found==0){
						answeryo=0.8;
						var post = {question: conceptName[n] , answer: answeryo }; 
							connection.query('INSERT INTO sys.db SET ?', post, function(err, result){
								if(err){}
							});
				}
				found=0;

	    	}
			connection.end();
		});

  		}

	});



	return answeryo;
};
			
module.exports = new util();