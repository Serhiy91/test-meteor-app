Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	},
	venuesCount: function() {
		return Venues.find().count();
	}
});

Template.venuesList.events({
	'click .table tbody tr': function(e) {
		Venues.update(this._id, {$set: {checked: ! this.checked}});
		e.currentTarget.className = !this.checked ? 'checked' : ''
	},
	'click .csv': function() {
		exportVenues();
	}
});