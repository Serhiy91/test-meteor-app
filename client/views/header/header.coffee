Template.header.events
	'click .logout': (e) ->
		e.preventDefault()
		Meteor.logout (err) ->
			if err then throwError(err.message)