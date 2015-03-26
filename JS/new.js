(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;
    var picturedata;

		var query = window.location.search.substring(1);
    	var urlinfo = query.split("=")[1];

      getLocation();

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
          //var span = document.createElement('span');
          //span.innerHTML = ['<img class="thumb" src="' + savedpicture +'"/>'].join('');
          //document.getElementById('picture').insertBefore(span, null);
          $('#img').attr('src', savedpicture);

          $('#save').on('click', function(e) {
            localStorage.setItem('ID=' + urlinfo, [$('#title').val(), $('#description').val(), $("#longitude").val(), $("#latitude").val(), $("#time").val(), $("#date").val()]);
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

            localStorage.setItem('ID=' + maximumID, [$('#title').val(), $('#description').val(), $("#longitude").val(), $("#latitude").val(), $("#time").val(), $("#date").val()]);
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
      } else {
        $('#longitude').css('visibility', 'hidden');
        $('#latitude').css('visibility', 'hidden');
        $('#time').css('visibility', 'hidden');
        $('#date').css('visibility', 'hidden');
      }
		});

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

		function handleFileSelect(evt) {
    		var files = evt.target.files;

    		for (var i = 0, f; f = files[i]; i++) {

      			if (!f.type.match('image.*')) {
        			continue;
      			}

      			var reader = new FileReader();

      			reader.onload = (function(theFile) {
        			return function(e) {

         				//var span = document.createElement('span');
          			//span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                $('#img').attr('src', e.target.result);
                picturedata = e.target.result;
          			//document.getElementById('picture').insertBefore(span, null);
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
    codeLatLng(lat, lng)
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