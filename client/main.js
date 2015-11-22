Template.body.helpers({
	//show loading while user state is undefined
	loadingUser: function() {
		return Meteor.user() === undefined;
	}
});