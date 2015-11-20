Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	},
	venuesCount: function() {
		return Venues.find().count();
	}
});

Template.venuesList.events({
	'click .table tr': function(e) {
		Venues.update(this._id, {$set: {checked: ! this.checked}});
		e.currentTarget.style.backgroundColor = !this.checked ? '#c1d7e9' : '#fff'
	},
	'click .csv': function() {
		exportVenues();
	}
});