Venues = new Meteor.Collection(null);

//make reactive map markers
Venues.find().observe({
	added: function(venue) {
		map.addMark(venue);
	},
	changed: function(newVenue) {
		map.updateMark(newVenue);
	},
	removed: function(venue) {
		map.removeMark(venue);
	}
});