Errors = new Meteor.Collection(null);

throwError = function(message) {
	var error = Errors.insert({message: message});
	setTimeout(function() {
		Errors.remove(error);
	}, 15000);
};