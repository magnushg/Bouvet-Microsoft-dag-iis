var map;
function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(60.3920969, 5.32812829999999),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }

$(function () {
	var viewModel = {entries : ko.observable(), url: ko.observable('http://hotell.difi.no/api/json/bergen/dokart?')};
	
	$.getJSON(viewModel.url(), function (data) {
		viewModel.entries(_.map(data.entries, function (entry) {
			return {
				adresse: entry.adresse,
				plassering: entry.plassering,
				lat: entry.latitude,
				lon: entry.longitude
			}
		}))

		_.each(viewModel.entries(), function (entry) {
			var marker = new google.maps.Marker({
    		position: new google.maps.LatLng(entry.lat,entry.lon),
    		map: map,
    		title:entry.plassering
    		});

			var infowindow = new google.maps.InfoWindow({
      			content: entry.plassering + ' ' + entry.adresse
  			});

  			 google.maps.event.addListener(marker, 'click', function() {
    			infowindow.open(map,marker);
  			});
		})
	})
	initialize();
	ko.applyBindings(viewModel);
});

