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
    $('.chip').fadeIn(1500);

    if (isUserChat) {
    	callAjax(message);	
    } else {
    	var objDiv = document.getElementById("chat-section");
		objDiv.scrollTop = objDiv.scrollHeight;
    }
}

function initQuery() {

	if(i == 0 ) {
		$('#description').fadeOut(1000, function(){
			$('#chat-section').fadeIn(1000);
		});

	}

	if (i % 2 ==0 && (($("input"))[0]).value != "" ){
		appendChatBubble((($("input"))[0]).value, true /* isUserChat */);
	}
	i++; //I don't even care
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        initQuery(); 
    }
});

document.getElementById('build-funnelcake').addEventListener('submit', function(e) {
    e.preventDefault();
}, false);



$("#submit").mousedown( function(){
	initQuery(); 
});



