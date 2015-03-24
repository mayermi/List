(function() {
	$(document).ready(function() {
		console.log('loaded');
		var maximumID = 1;
    var picturedata;

		var query = window.location.search.substring(1);
    	var urlinfo = query.split("=")[1];

    	if(urlinfo!=="liste" && urlinfo!=="index") {
    		var element = localStorage.getItem('ID=' + urlinfo).split(',');
        var savedpicture = localStorage.getItem('imgID=' + urlinfo);
    		$('#title').val(element[0]);
    		$('#description').val(element[1]);
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="' + savedpicture +'"/>'].join('');
        document.getElementById('picture').insertBefore(span, null);

    		$('#save').on('click', function(e) {
				localStorage.setItem('ID=' + urlinfo, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
        localStorage.setItem('imgID=' + maximumID, picturedata);
			});

			$("#save").attr("href", "./event.html?id=" + urlinfo);

    	} else {
    		console.log('do i happen');

			$('#save').on('click', function(e) {
				while (!(localStorage.getItem('ID=' + maximumID) === null)) {
  					maximumID++;
				}

				localStorage.setItem('ID=' + maximumID, [$('#title').val(), $('#description').val(), "longitude", "latitude"]);
        localStorage.setItem('imgID=' + maximumID, picturedata);
				maximumID = 1;
			});

			$("#save").attr("href", "./" +  urlinfo + ".html?mode=saved");
		}
		
		$('#details').on('click', function(e) {
		
		});

		function handleFileSelect(evt) {
    		var files = evt.target.files;

    		for (var i = 0, f; f = files[i]; i++) {

      			if (!f.type.match('image.*')) {
        			continue;
      			}

      			var reader = new FileReader();

      			reader.onload = (function(theFile) {
        			return function(e) {

         				var span = document.createElement('span');
          			span.innerHTML = ['<img class="thumb" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
                picturedata = e.target.result;
          			document.getElementById('picture').insertBefore(span, null);
        			};
      			})(f);

      			reader.readAsDataURL(f);
    		}
  		}
  		document.getElementById('loadpicture').addEventListener('change', handleFileSelect, false);
	});
})();