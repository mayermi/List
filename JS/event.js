(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var eventid = query.split("=")[1];

		var element = localStorage.getItem('ID=' + eventid).split(',');

    checkAnniversary();
		
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
          checkLastReminder(maximumID);
        }
        
        maximumID++;
      }
      maximumID = 1;
    }

    function checkAnniversary() {
      while (!(localStorage.getItem('ID=' + maximumID) === null)) {
          var element = localStorage.getItem('ID=' + maximumID).split(',');
          if (element[6] === 'year') {
            if (getDate() === element[8] && getTime() === element[4]) {
              alert('You are near ' + savedelement[0] + '!');

              // save when last reminded
              localStorage.setItem('ID=' + maximumID, [
                element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], 
                getDate()]);
            }
          } else if (element[6] === 'six') {
            getDateMonstLater(6, element);
          } else if (element[6] === 'three') {
            getDateMonstLater(3, element);
          } else if (element[6] === 'one') {
            getDateMonstLater(1, element);
          } else if (element[6] === 'never') {
          }
          maximumID++;
        }
        maximumID = 1;
    }

    function checkLastReminder(ID) {
      var element = localStorage.getItem('ID=' + ID).split(',');
      if (element[7] === 'year') {
        if (element[8].split("/").pop() < getDate().split("/").pop()) {
          alert('More than a year ago ' + savedelement[0] + ' happend!');

          // save when last reminded
          localStorage.setItem('ID=' + maximumID, [
            element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], 
            getDate()]);
        }
        
      } else if (element[7] === 'six') {
        checkBiggerDate(6, element);
      } else if (element[7] === 'three') {
        checkBiggerDate(3, element);
      } else if (element[7] === 'one') {
        checkBiggerDate(1, element);
      } else if (element[7] === 'never') {
      }
    }

    function getDateMonstLater(numberOfMonthsLater, element) {
      var start_pos = element[8].indexOf('/') + 1;
      var end_pos = element[8].indexOf('/',start_pos);
      var monthXMonsthsLater = parseInt(element[8].substring(start_pos,end_pos)) + numberOfMonthsLater;
      if (monthXMonsthsLater > 12) {
        monthXMonsthsLater = monthXMonsthsLater - 12;
      }
      var dateXMonsthsLater = element[8].split("/").shift() + '/0' + monthXMonsthsLater +  "/" + element[8].split("/").pop();
      if (getDate() === dateXMonsthsLater && getTime() === element[4]) {
        alert(numberOfMonthsLater + 'months ago ' + savedelement[0] + ' happend!');

        // save when last reminded
        localStorage.setItem('ID=' + maximumID, [
          element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], 
          getDate()]);
      }
    }

    function checkBiggerDate(numberOfMonthsLater, element) {
      if (element[8].split("/").pop() === getDate().split("/").pop()) {
        var start_pos = element[8].indexOf('/') + 1;
        var end_pos = element[8].indexOf('/',start_pos);
        var reminderMonth = parseInt(element[8].substring(start_pos,end_pos));

        var start_pos_now = getDate().indexOf('/') + 1;
        var end_pos_now = getDate().indexOf('/',start_pos);
        var nowMonth = parseInt(element[8].substring(start_pos_now,end_pos_now));

        if (reminderMonth + numberOfMonthsLater < nowMonth) {
          alert('More than ' + numberOfMonthsLater + 'months ago ' + savedelement[0] + ' happend!');

          // save when last reminded
          localStorage.setItem('ID=' + maximumID, [
            element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], 
            getDate()]);
        }
      } else if (element[8].split("/").pop() < getDate().split("/").pop()) {
        var start_pos = element[8].indexOf('/') + 1;
        var end_pos = element[8].indexOf('/',start_pos);
        var reminderMonth = parseInt(element[8].substring(start_pos,end_pos));

        var start_pos_now = getDate().indexOf('/') + 1;
        var end_pos_now = getDate().indexOf('/',start_pos);
        var nowMonth = parseInt(element[8].substring(start_pos_now,end_pos_now));

        if (element[8].split("/").pop() + 1 === getDate().split("/").pop()) {
          if (reminderMonth + numberOfMonthsLater > 12) {
            if (reminderMonth + numberOfMonthsLater - 12 < nowMonth) {
              alert('More than ' + numberOfMonthsLater + 'months ago ' + savedelement[0] + ' happend!');

              // save when last reminded
              localStorage.setItem('ID=' + maximumID, [
                element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], 
                getDate()]);
            }
          }
        }
      }
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
	});
})();