Venues = new Meteor.Collection(null);
var markers = [];

Venues.find().observe({
	added: function(venue) {
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
			map: GoogleMaps.maps.map.instance,
			id: venue._id
		});
		markers.push(marker);
	},
	removed: function(mark) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		console.log(markers.length);
		markers = [];
	}
});

Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	}
});