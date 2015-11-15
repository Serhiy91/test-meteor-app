Meteor.subscribe('queries');

Template.prevQueries.helpers({
	queries: function() {
		return Queries.find();
	}
});