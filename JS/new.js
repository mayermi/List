(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		$.getJSON("./Data/Data.json", function(data) {
			$.each(data, function(id) {
				hightesID = data[id].id;
			});
		});

		$('#save').on('click', function(e) {
			while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  				maximumID++;
			}

			localStorage.setItem('ID=' + maximumID, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
			maximumID = 1;
		});
	});
})();