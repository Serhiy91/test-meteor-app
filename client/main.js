Template.body.helpers({
	loadingUser: function() {
		return Meteor.user() === undefined;
	}
});