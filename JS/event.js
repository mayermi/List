(function() {
	$(document).ready(function() {
		console.log('loaded');

		var query = window.location.search.substring(1);
    	var eventid = query.split("=")[1];

		var element = localStorage.getItem('ID=' + eventid).split(',');
		
		$('#title').text(element[0]);
		$('main').append("<p>" + element[1] + "</p>");
		$("#edit").attr("href", "./new.html?editid=" + eventid);
	});
})();