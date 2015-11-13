Meteor.startup(function() {
	GoogleMaps.load();
});

Template.map.helpers({
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(35.6833, 139.7833),
				zoom: 11
			};
		}
	}
});