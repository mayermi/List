(function() {
	$(document).ready(function() {
		console.log('loaded');

		var query = window.location.search.substring(1);
    	var wassaved = query.split("=")[1];

    	if(wassaved!==null) {
    		//do some notification
    	}

		$('#save').on('click', function(e) {
			while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  				maximumID++;
			}
			console.log('i happen');
			localStorage.setItem('ID=' + maximumID, [$('#title').val(),, "longitude", "latitude"]);
			maximumID = 1;
		});
	});
})();