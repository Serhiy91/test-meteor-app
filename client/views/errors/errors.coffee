Template.errors.helpers
	errors: ->
		Errors.find()

#cancel error message limitation by click
Template.errors.events
	'click .alert': ->
		clearTimeout(errorsTimersList[@_id])