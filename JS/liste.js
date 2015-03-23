(function() {
	$(document).ready(function() {
		console.log('loaded');

		$.getJSON("./Data/Data.json", function(data) {

			$.each(data, function(id) {
				$("#eventlist").append('<li>' + "<a href=\"./event.html?id=" + data[id].id + " \">"
					+ data[id].title 
					+ '<br>'
					+ data[id].description
					+ '</a>'
					+ '</li>'
				);
			});
		});
	});
})();