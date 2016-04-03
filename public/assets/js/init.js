var i = 0;

function callAjax(userInput){
	$.ajax({
  		method: "POST",
  		url: "/",

  		data: {userInput: userInput},
  		error: function (xhr, ajaxOptions, thrownError) {
  			console.log(thrownError);
       	},
       	success: function(responseText){
       		console.log(responseText);
       	}
		})
  		.done(function( msg ) {	
  		// eventually append returned msg		
  	});
}

function appendChatBubble(message, isUserChat){

    $( '<div class="user-request-wrapper"><div class ="chip">' + message +' </div></div>').appendTo( "#chat-section" );

    callAjax(message);
}




$("#submit").mousedown( function(){

	if (i % 2 ==0 ){
		appendChatBubble((($("input"))[0]).value, true /* isUserChat */);
	}
	i++; //I don't even care


  //    $.ajax({
  // 		method: "POST",
  // 		url: "/",

  // 		data: {userInput: (($("input"))[0]).value},
  // 		error: function (xhr, ajaxOptions, thrownError) {
  // 			console.log(thrownError);
  //      	},
  //      	success: function(responseText){
  //      		console.log(responseText);
  //      	}
		// })
  // 		.done(function( msg ) {
  			
  // 	});

});