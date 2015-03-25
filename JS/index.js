(function() {
	$(document).ready(function() {
		console.log('loaded');
    var maximumID = 1;
    var D;
    var k;

		var query = window.location.search.substring(1);
    	var wassaved = query.split("=")[1];

    	if(wassaved === 'saved') {
    		alert('Your entry has been successfully saved!');
    	}

		$('#save').on('click', function(e) {
			while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  				maximumID++;
			}
			localStorage.setItem('ID=' + maximumID, [$('#title').val(),, D, k, getTime(), getDate()]);
      $("#save").attr("href", "index.html?mode=saved");
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

              console.log(pos);
              // Save current position
              D = pos.D;
              k = pos.k;
              //checkLocation(D,k);

            	map.setCenter(pos);
          	}, function() {
            	handleNoGeolocation(true);
          	});
        	} else {
          	// Browser doesn't support Geolocation
          	handleNoGeolocation(false);
        	}
      	}

        function checkLocation(longitude, latitude) {
          console.log(maximumID);
          while (!(localStorage.getItem('ID=' + maximumID) === null)) {
            var savedelement = localStorage.getItem('ID=' + maximumID).split(',');
            var rsavedlongitude = Math.round(savedelement[2] * 1000) / 1000;
            var rsavedlatitude = Math.round(savedelement[3] * 1000) / 1000;
            var rlongitude = Math.round(longitude * 1000) / 1000;
            var rlatitude = Math.round(latitude * 1000) / 1000;
        
            if(rsavedlongitude === rlongitude && rsavedlatitude === rlatitude) {
              alert('You are near ' + savedelement[0] + '!');
            }
           maximumID++;
          }
          maximumID = 1;
        }

        function getDate() {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1;
          var yyyy = today.getFullYear();

          if(dd<10) {
            dd='0'+dd
          } 

          if(mm<10) {
            mm='0'+mm
          } 

          today = dd+'/'+mm+'/'+yyyy;
          return today;
        }   

        function getTime() {
          d = new Date();
          datetext = d.toTimeString();
          datetext = datetext.split(' ')[0];
          return datetext;
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