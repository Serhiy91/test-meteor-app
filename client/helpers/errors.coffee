@Errors = new Meteor.Collection null
@errorsTimersList = {}

@throwError = (message, warn) ->
	error = Errors.insert message: message, warn: warn

	# Show error message for 15s
	errorsTimersList[error] = setTimeout ->
		Errors.remove error
	, 15000