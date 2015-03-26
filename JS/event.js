(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var eventid = query.split("=")[1];

		var element = localStorage.getItem('ID=' + eventid).split(',');
		
        var picturedata = localStorage.getItem('imgID=' + eventid);
    if (picturedata) {
      $('main').append('<img class="thumb" src="' + picturedata + '"/>');
    }

		$('main').append("<p>" + element[0] + "</p>");
		$('main').append("<p>" + element[1] + "</p>");
		$('main').append("<p>" + element[2] + "</p>");
		$('main').append("<p>" + element[3] + "</p>");
		$('main').append("<p>" + element[4] + "</p>");
		$('main').append("<p>" + element[5] + "</p>");
		$('main').append("<div id=\"map-canvas\">Please allow us to use your current location so you can appreciate all of our app functions</div>");
		$("#edit").attr("href", "./new.html?editid=" + eventid);


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

      		var pos = new google.maps.LatLng(element[3], element[2]);
          checkLocation(position.coords.longitude, position.coords.latitude);

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