(function() {
	$(document).ready(function() {
		console.log('loaded');
    var maximumID = 1;
    var D;
    var k;

		var query = window.location.search.substring(1);
    	var wassaved = query.split("=")[1];

    	if(wassaved!==null) {
    		//do some notification
    	}

		$('#save').on('click', function(e) {
			while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  				maximumID++;
			}
			localStorage.setItem('ID=' + maximumID, [$('#title').val(),, D, k]);
			maximumID = 1;
		});

		// Show Google Maps
		var map;

        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

      	function initialize() {
        	var mapOptions = {
          	zoom: 20
        	};
        	map = new google.maps.Map(document.getElementById('map-canvas'),
            	mapOptions);

          // Marker
          var infowindow = new google.maps.InfoWindow();
          var marker, i;

          var elementlist = [];

          while (!(localStorage.getItem('ID=' + maximumID) === null)) {
            var element = localStorage.getItem('ID=' + maximumID).split(',');
            elementlist.push(element);
            maximumID++;
          }
          maximumID = 1;

          for (i = 0; i < elementlist.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(elementlist[i][3], elementlist[i][2]),
              map: map
            });


          console.log(elementlist);
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                var arrayposition = i+1;
                window.location = "event.html?id=" + arrayposition ;
              }
            })(marker, i));
          }

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

              // Save current position
              console.log(pos);
              D = pos.D;
              k = pos.k;

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