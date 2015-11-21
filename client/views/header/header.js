Template.header.events({
	'click .logout': function(e) {
		e.preventDefault();
		Meteor.logout(function(err) {
			if (err) {
				if (err.message) {
					throwError(err.message);
				} else {
					throwError('Can not logout');
				}
			}
		});
	}
});