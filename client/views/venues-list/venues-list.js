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

Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	},
	venuesCount: function() {
		return Venues.find().count();
	}
});

Template.venuesList.events({
	'click .table tr': function() {
		Venues.update(this._id, {$set: {checked: ! this.checked}});
	},
	'click .csv': function() {
		exportVenues();
	}
});