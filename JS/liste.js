(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;

		var query = window.location.search.substring(1);
    	var wassaved = query.split("=")[1];

    checkAnniversary();

    	if(wassaved === 'saved') {
        alert('Your entry has been successfully saved!');
    	}

		while (!(localStorage.getItem('ID=' + maximumID) === null)) {

			var element = localStorage.getItem('ID=' + maximumID).split(',');
			var picturedata = localStorage.getItem('imgID=' + maximumID);

      if (picturedata) {
        $("#eventlist").append('<li>' + "<a href=\"./event.html?id=" + maximumID + " \">"
          + '<img class="thumb" src="' + picturedata + '"/>'
          + element[0]
          + '<br>'
          + element[1]
          + '</a>'
          + '</li>'
        );
      } else {
        $("#eventlist").append('<li>' + "<a href=\"./event.html?id=" + maximumID + " \">"
          + element[0]
          + '<br>'
          + element[1]
          + '</a>'
          + '</li>'
        );
      }

			

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
        $("#save").attr("href", "liste.html?mode=saved");
				maximumID = 1;
			});
		}

    function checkLocation(longitude, latitude) {
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
	});
})();