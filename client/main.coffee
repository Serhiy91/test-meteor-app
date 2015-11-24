Template.body.helpers
	# Show loading while user state is undefined
	loadingUser: ->
		Meteor.user() is undefined;