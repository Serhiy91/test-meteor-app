Template.errors.helpers({
	errors: function() {
		return Errors.find();
	}
});

//cancel error message limitation by click
Template.errors.events({
	'click .alert': function() {
		clearTimeout(errorsTimersList[this._id]);
	}
});