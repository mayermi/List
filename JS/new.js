(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var editid = query.split("=")[1];

    	if(editid!==null) {
    		var element = localStorage.getItem('ID=' + editid).split(',');
    		$('#title').val(element[0]);
    		$('#description').val(element[1]);

    		$('#save').on('click', function(e) {
				localStorage.setItem('ID=' + editid, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
			});
    	} else {

			$('#save').on('click', function(e) {
				while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  					maximumID++;
				}

				localStorage.setItem('ID=' + maximumID, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
				maximumID = 1;
			});
		}
		
		$('#details').on('click', function(e) {
		
		});
	});
})();