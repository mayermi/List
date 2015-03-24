(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

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
	});
})();