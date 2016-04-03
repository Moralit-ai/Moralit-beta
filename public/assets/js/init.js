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
       		appendChatBubble(responseText, false /* isUserChat */);
       		console.log(responseText);
       	}
		})
  		.done(function( msg ) {	
  		// eventually append returned msg		
  	});
}
//+ isUserChat ? '' : 'ai-chip' +'

function appendChatBubble(message, isUserChat){
	var style = isUserChat ? '' : 'ai-chip';

    $( '<div class="user-request-wrapper"><div class="chip '+style+'">' + message +' </div></div>').appendTo( "#chat-section" );

    if (isUserChat) {
    	callAjax(message);	
    };
}


$("#submit").mousedown( function(){
	if (i % 2 ==0 ){
		appendChatBubble((($("input"))[0]).value, true /* isUserChat */);
	}
	i++; //I don't even care
});