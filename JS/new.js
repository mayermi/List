(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var urlinfo = query.split("=")[1];

    	if(urlinfo!=="liste" && urlinfo!=="index") {
    		var element = localStorage.getItem('ID=' + urlinfo).split(',');
    		$('#title').val(element[0]);
    		$('#description').val(element[1]);

    		$('#save').on('click', function(e) {
				localStorage.setItem('ID=' + urlinfo, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
			});

			$("#save").attr("href", "./event.html?id=" + urlinfo);

    	} else {
    		console.log('do i happen');

			$('#save').on('click', function(e) {
				while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  					maximumID++;
				}

				localStorage.setItem('ID=' + maximumID, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
				maximumID = 1;
			});

			$("#save").attr("href", "./" +  urlinfo + ".html?mode=saved");
		}
		
		$('#details').on('click', function(e) {
		
		});
	});
})();