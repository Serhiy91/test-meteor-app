FOURSQUARE_VERSION = '20130815'

Meteor.methods
	'searchVenues': (queryData) ->
		if not CLIENT_ID or not CLIENT_SECRET
			throw new Meteor.Error 'Foursqaure is not configured'

		if not Meteor.user()
			throw new Meteor.Error 'You need to sign in'

		params =
			client_id: CLIENT_ID
			client_secret: CLIENT_SECRET
			v: FOURSQUARE_VERSION
			radius: queryData.radius
			query: queryData.query
			ll: queryData.lat + ',' + queryData.lng
			limit: 50

		try
			response = HTTP.get 'https://api.foursquare.com/v2/venues/search', params: params
		catch err
			throw new Meteor.Error err.message

		response.data.response.venues;