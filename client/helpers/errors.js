Errors = new Meteor.Collection(null);
errorsTimersList = {};

throwError = function(message) {
	var error = Errors.insert({message: message});

	//show error message for 15s
	errorsTimersList[error] = setTimeout(function() {
		Errors.remove(error);
	}, 15000);
};