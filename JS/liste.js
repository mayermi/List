(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var wassaved = query.split("=")[1];

    	if(wassaved!==null) {
    		//do some notification
    	}

		while (!(localStorage.getItem('ID=' + maximumID) === null)) {

			var element = localStorage.getItem('ID=' + maximumID).split(',');
			var picturedata = localStorage.getItem('imgID=' + maximumID);

			$("#eventlist").append('<li>' + "<a href=\"./event.html?id=" + maximumID + " \">"
					+ '<img class="thumb" src="' + picturedata + '"/>'
					+ element[0]
					+ '<br>'
					+ element[1]
					+ '</a>'
					+ '</li>'
				);

  			maximumID++;
		}
    maximumID = 1;

		getLocation();

    function showandsave(longitde, latitude) {
			$('#save').on('click', function(e) {
				while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  					maximumID++;
				}

				localStorage.setItem('ID=' + maximumID, [$('#title').val(),, longitude, latitude, getTime(), getDate()]);
				maximumID = 1;
			});
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

		var x = document.getElementById("location");

    	function getLocation() {
      		if (navigator.geolocation) {
        		navigator.geolocation.getCurrentPosition(showPosition);
      		} else {
        		location.innerHTML = "Geolocation is not supported by this browser.";
      		}
    	}

    	function showPosition(position) {
        	longitude = position.coords.longitude;
        	showandsave(position.coords.longitude, position.coords.latitude);
          checkLocation(position.coords.longitude, position.coords.latitude);
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
	});
})();