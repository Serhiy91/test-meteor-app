@Queries = new Meteor.Collection 'queries'

Queries.allow
#user can delete only his queries
	remove: (userId, doc) ->
		doc and doc.userId is userId

Meteor.methods
	addQuery: (query) ->
		user = Meteor.user()
		if not user
			throwError 'You need to login to add new queries'
			return;

		#	Allow only necessary properties for query object and extend the query
		# 	object by new properties
		query = _.extend _.pick(query, 'query', 'lat', 'lng', 'radius', 'zoom'),
			userId: user._id
			date: new Date().getTime()

		Queries.insert(query);