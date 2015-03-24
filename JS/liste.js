(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var wassaved = query.split("=")[1];

    	if(wassaved!==null) {
    		//do some notification
    	}

		while (!(localStorage.getItem('ID=' + maximumID) === null)) {

			var element = localStorage.getItem('ID=' + maximumID).split(',');

			$("#eventlist").append('<li>' + "<a href=\"./event.html?id=" + maximumID + " \">"
					+ element[0] 
					+ '<br>'
					+ element[1]
					+ '</a>'
					+ '</li>'
				);

  			maximumID++;
		}

		$('#save').on('click', function(e) {
			while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  				maximumID++;
			}

			localStorage.setItem('ID=' + maximumID, [$('#title').val(),, "longitude", "latitude"]);
			maximumID = 1;
		});
	});
})();