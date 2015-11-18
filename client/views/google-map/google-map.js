var LATITUDE = 35.6833;
var LONGITUDE = 139.7833;
var ZOOM = 11;

//load map
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

map = new Map();

Template.map.events({
	'submit .main-form': function(e) {
		e.preventDefault();
		if (!e.target[0].value) {
			throw new Meteor.Error('Please fill in a headline');
		}

		//get google map data for request to foursquare
		var queryObject = map.getCurrentState(GoogleMaps.maps.map.instance);
		queryObject.query = e.target[0].value;

		//make request to foursquare
		Meteor.call('searchVenues', queryObject, function(err, venues) {
			Meteor.call('addQuery', queryObject);

			Venues.remove({});
			_.each(venues, function(venue) {
				Venues.insert(venue);
			});
		});
	}
});