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