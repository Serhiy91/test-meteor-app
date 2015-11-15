Template.auth.events({
	'click .google-btn': function() {
		return Meteor.loginWithGoogle({
			requestPermissions: ['email']
		}, function(error) {
			if (error) {
				return console.log(error.reason);
			}
		});
	}
});