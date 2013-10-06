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
	var viewModel = {entries : [], url: 'http://hotell.difi.no/api/json/bergen/dokart?'};
	
	$.getJSON(viewModel.url, function (data) {
		viewModel.entries = _.map(data.entries, function (entry) {
			return {
				adresse: entry.adresse,
				plassering: entry.plassering,
				lat: entry.latitude,
				lon: entry.longitude
			}
		});

		  
	var heading = '<h3>' + viewModel.url + '</h3>'
	var tableHtml = '<table class="table table-responsive"><thead><th>Adresse</th><th>Plassering</th><th>Latitude</th><th>Longitude</th></thead><tbody>'
    _.each(viewModel.entries, function (entry) {
    	tableHtml += '<tr><td>' + entry.adresse + '</td><td>' + entry.plassering + '</td><td>' + entry.lat + '</td><td>' + entry.lon + '</td></tr>'
    });
    tableHtml += '</tbody></table>'
    html = heading + tableHtml;
    $("#dataTable").append(html);

	_.each(viewModel.entries, function (entry) {
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
});

