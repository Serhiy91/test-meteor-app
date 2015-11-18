Template.auth.events({
	'click .google-btn': function() {
		return Meteor.loginWithGoogle({
			requestPermissions: ['email']
		}, function(err) {
			if (err) {
				throwError(err.message);
			}
		});
	}
});