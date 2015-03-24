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

		// Show Google Maps
		var map;

      	function initialize() {
        	var mapOptions = {
          	zoom: 6
        	};
        	map = new google.maps.Map(document.getElementById('map-canvas'),
            	mapOptions);

        	// Try HTML5 geolocation
        	if(navigator.geolocation) {
          	navigator.geolocation.getCurrentPosition(function(position) {
            	var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

            	var infowindow = new google.maps.InfoWindow({
              	map: map,
              	position: pos,
              	content: 'Location found using HTML5.'
            	});

            	map.setCenter(pos);
          	}, function() {
            	handleNoGeolocation(true);
          	});
        	} else {
          	// Browser doesn't support Geolocation
          	handleNoGeolocation(false);
        	}
      	}

      	function handleNoGeolocation(errorFlag) {
        	if (errorFlag) {
          	var content = 'Error: The Geolocation service failed.';
        	} else {
          	var content = 'Error: Your browser doesn\'t support geolocation.';
        	}

        	var options = {
          	map: map,
          	position: new google.maps.LatLng(60, 105),
          	content: content
        	};

        	var infowindow = new google.maps.InfoWindow(options);
        	map.setCenter(options.position);
      	}

      	google.maps.event.addDomListener(window, 'load', initialize);
	});
})();