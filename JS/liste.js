(function() {
	$(document).ready(function() {
		console.log('dmkl');

		$.getJSON("./Data/Data.json", function(data) {
			console.log(data[1].title);

			$.each(data, function(id) {
				$("#eventlist").append('<li>' + "<a href=\"./event.html\">"
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