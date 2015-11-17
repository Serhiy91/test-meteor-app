Meteor.subscribe('queries');

Template.prevQueries.helpers({
	queries: function() {
		return Queries.find();
	}
});

Template.prevQueries.events({
	'click .delete': function() {
		Meteor.call('deleteQuery', this._id);
	}
});