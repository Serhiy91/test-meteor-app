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
		if (!e.target[0].value) {
			throw new Meteor.Error('Please fill in a headline');
		}

		var R_EARTH = 6378;
		var RADIANS = 57.2958;

		var bounds = GoogleMaps.maps.map.instance.getBounds();
		var centerCords = {
			lat: bounds.getCenter().lat(),
			lng: bounds.getCenter().lng()
		};
		var northEastRadCords = {
			lat: bounds.getNorthEast().lat() / RADIANS,
			lng: bounds.getNorthEast().lng() / RADIANS
		};

		var distance = R_EARTH * Math.acos(Math.sin(centerCords.lat / RADIANS) *
				Math.sin(northEastRadCords.lat) + Math.cos(centerCords.lat / RADIANS) *
				Math.cos(northEastRadCords.lat) * Math.cos(northEastRadCords.lng - centerCords.lng / RADIANS));

		var queryObject = {
			query: e.target[0].value,
			lat: centerCords.lat,
			lng: centerCords.lng,
			radius: distance
		};

		Meteor.call('searchVenues', queryObject, function(err, res) {
			Meteor.call('addQuery', queryObject);
			Venues.remove({});
			for (var i = 0; i < res.length; i++) {
				Venues.insert(res[i]);
			}
		});
	}
});