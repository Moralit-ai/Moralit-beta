'use strict';

$(document).ready(function() {

    // Show URL form when checkboxes are clicked
    (function() {
        $('#modifications .page input[type="checkbox"]').change(function() {
            $(this).closest('.page').find('.url').toggleClass('hidden');
        });
    }());


/*
    var projectsList = JSON.stringify(projToClient)

	var projectsListDOM = document.getElementById("projectsList");
	projectsList.forEach(function(project) {
		var option = document.createElement("option");
		option.text = project.project_name;
		option.value = project.id;
		projectsListDOM.add(option);
	});*/

    // Fake progress
    (function() {
        $('#build-funnelcake').submit(function(event) {
            event.preventDefault();

            $(this).remove();

            var $statusUL = $('main').append('<section id="status"><h1>Status</h1></section>').find('#status').append('<ul>').find('ul');
            fakeStatus($statusUL);

            setTimeout(function() {
                var $resultsUL = $('main').append('<section id="results"><h1>Results</h1></section>').find('#results').append('<ul>').find('ul');
                $resultsUL.append('<li><a href="http://example.com?funnelcake-example-a">Funnelcake</a></li>');
                $resultsUL.append('<li><a href="http://example.com?funnelcake-example-b">Experiment details</a></li>');
                $resultsUL.append('<li><a href="http://example.com?funnelcake-example-c">A/B test</a></li>');
            }, 20000);
        });

        function fakeStatus($statusUL) {
            var messages = [
                'Building funnelcake',
                'Updating funnelcake master tracker',
                'Publishing experiment details',
                'Creating A/B test'
            ];

            function addMessage() {
                $statusUL.append('<li>' + messages.shift() + '</li>');

                var dots = 0;
                var addDots = setInterval(function() {
                    $statusUL.find('li:last-child').append('.');
                    dots++;

                    if (dots === 3) {
                        clearInterval(addDots);
                    }
                }, 1000);

                setTimeout(function() {
                    $statusUL.find('li:last-child').append(' done');
                }, 4000);
            }

            addMessage();
            var addMessages = setInterval(function() {
                addMessage();

                if (messages.length === 0) {
                    clearInterval(addMessages);
                }
            }, 5000);
        }
    }());

});
