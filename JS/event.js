(function() {
	$(document).ready(function() {
		console.log('loaded');

		var query = window.location.search.substring(1);
    	var eventid = query.split("=")[1];

    	console.log(eventid);

    	$.getJSON("./Data/Data.json", function(data) {

    		$('#title').text(data[eventid].title);
			
			$('main').append("<p>" + data[eventid].description + "</p>");
		});
	});
})();