(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;
    var picturedata;

		var query = window.location.search.substring(1);
    	var urlinfo = query.split("=")[1];

      getLocation();
      checkAnniversary();

      function showandsave(longitde, latitude) {
        getCity();
        if(urlinfo!=="liste" && urlinfo!=="index") {
          var element = localStorage.getItem('ID=' + urlinfo).split(',');
          var savedpicture = localStorage.getItem('imgID=' + urlinfo);
          $('#title').val(element[0]);
          $('#description').val(element[1]);
          $('#longitude').val(element[2]);
          $('#latitude').val(element[3]);
          $('#time').val(element[4]);
          $('#date').val(element[5]);
          if (picturedata) {
            $('#img').attr('src', savedpicture);
          }
          $("#atleast").val(element[6]);
          $("#notmore").val(element[7]);


          $('#save').on('click', function(e) {
            localStorage.setItem('ID=' + urlinfo, [
              $('#title').val(), 
              $('#description').val(),
              $("#longitude").val(),
              $("#latitude").val(),
              $("#time").val(),
              $("#date").val(),
              $("#atleast").val(),
              $("#notmore").val(),
              element[8]]);
            localStorage.setItem('imgID=' + maximumID, picturedata);
          });

          $("#save").attr("href", "./event.html?id=" + urlinfo);

        } else {
          $('#longitude').val(longitude);
          $('#latitude').val(latitude);
          $('#time').val(getTime());
          $ ('#date').val(getDate());

           $('#save').on('click', function(e) {
            while (!(localStorage.getItem('ID=' + maximumID) === null)) {
              maximumID++;
            }

            localStorage.setItem('ID=' + maximumID, [
              $('#title').val(), 
              $('#description').val(), 
              $("#longitude").val(), 
              $("#latitude").val(), 
              $("#time").val(), 
              $("#date").val(),
              $("#atleast").val(), 
              $("#notmore").val(),
              $("#date").val()]);
            localStorage.setItem('imgID=' + maximumID, picturedata);
            maximumID = 1;
          });

          $("#save").attr("href", "./" +  urlinfo + ".html?mode=saved");
        }
      }

		$('#details').on('click', function(e) {
      if ($("#longitude").css("visibility") == "hidden") {
        $('#longitude').css('visibility', 'visible');
        $('#latitude').css('visibility', 'visible');
        $('#time').css('visibility', 'visible');
        $('#date').css('visibility', 'visible');
        $('#patleast').css('visibility', 'visible');
        $('#atleast').css('visibility', 'visible');
        $('#pnotmore').css('visibility', 'visible');
        $('#notmore').css('visibility', 'visible');
      } else {
        $('#longitude').css('visibility', 'hidden');
        $('#latitude').css('visibility', 'hidden');
        $('#time').css('visibility', 'hidden');
        $('#date').css('visibility', 'hidden');
        $('#patleast').css('visibility', 'hidden');
        $('#atleast').css('visibility', 'hidden');
        $('#pnotmore').css('visibility', 'hidden');
        $('#notmore').css('visibility', 'hidden');
      }
		});

    function checkAnniversary() {
      var element = localStorage.getItem('ID=' + urlinfo).split(',');
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

		function handleFileSelect(evt) {
    		var files = evt.target.files;

    		for (var i = 0, f; f = files[i]; i++) {

      			if (!f.type.match('image.*')) {
        			continue;
      			}

      			var reader = new FileReader();

      			reader.onload = (function(theFile) {
        			return function(e) {
         				$('#img').attr('src', e.target.result);
                picturedata = e.target.result;
        			};
      			})(f);

      			reader.readAsDataURL(f);
    		}
  		}
  		document.getElementById('loadpicture').addEventListener('change', handleFileSelect, false);

      function getCity() {
        var geocoder;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    //codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

  function initialize() {
    geocoder = new google.maps.Geocoder();



  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         alert(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        alert(city.short_name + " " + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }
      }
	});
})();