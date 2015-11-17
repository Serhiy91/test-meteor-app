Venues = new Meteor.Collection(null);
var markers = [];

//make reactive map markers
Venues.find().observe({
	added: function(venue) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
			map: GoogleMaps.maps.map.instance
		});
		markers.push(marker);
	},
	removed: function() {
		if (markers.length !== 0) {
			_.each(markers, function(marker) {
				marker.setMap(null);
			});
			markers = [];
		}
	}
});

Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	},
	venuesCount: function() {
		return Venues.find().count();
	}
});

Template.venuesList.events({
	'click .csv': function() {
		exportVenues();
	}
});