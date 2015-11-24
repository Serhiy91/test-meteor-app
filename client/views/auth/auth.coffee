Template.auth.events
	'click .google-btn': ->
		Meteor.loginWithGoogle
			requestPermissions: ['email'], (err) ->
				if err then throwError err.message