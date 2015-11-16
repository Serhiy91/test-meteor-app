Venues = new Meteor.Collection(null);

Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	}
});