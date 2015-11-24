Meteor.publish 'queries', (limit) ->
	# Use publish-counts package for get all document count on the client
	Counts.publish(this, 'queriesCounter', Queries.find(userId: @userId))

	Queries.find userId: @userId,
		sort:
			date: -1
		limit: limit