Venues = new Meteor.Collection(null);

//make reactive map markers
Venues.find().observe({
	added: function(venue) {
		map.addMark(venue, GoogleMaps.maps.map.instance);
	},
	changed: function(newVenue) {
		map.updateMark(newVenue, GoogleMaps.maps.map.instance);
	},
	removed: function(venue) {
		map.removeMark(venue);
	}
});