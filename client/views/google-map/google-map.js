var LATITUDE = 35.6833;
var LONGITUDE = 139.7833;
var ZOOM = 11;

Meteor.startup(function() {
	GoogleMaps.load();
});

Template.map.helpers({
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(LATITUDE, LONGITUDE),
				zoom: ZOOM
			};
		}
	}
});

Template.map.events({
	'submit .main-form': function(e) {
		e.preventDefault();
		var map = GoogleMaps.maps.map.instance;
		var queryObject = {
			query: e.target[0].value,
			lat: map.center.lat(),
			lng: map.center.lng(),
			zoom: map.zoom
		};

		console.log(queryObject);
	}
});