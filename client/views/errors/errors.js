Template.errors.helpers({
	errors: function() {
		return Errors.find();
	}
});

//cancel error message limitation by click
Template.errors.events({
	'click .alert-danger': function() {
		clearTimeout(errorsTimersList[this._id]);
	}
});