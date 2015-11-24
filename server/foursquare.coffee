FOURSQUARE_VERSION = '20130815'

Meteor.methods
	'searchVenues': (queryData) ->
		regexp = /^[\s\d\[\]\\$^().*_+?=&%#@!~`',"<>{}]/ #not start with these characters
		regexp2 = /[~`@=\[\]{}]/
		query = queryData.query

		if not CLIENT_ID or not CLIENT_SECRET
			throw new Meteor.Error 'Foursqaure is not configured'
		if not Meteor.user()
			throw new Meteor.Error 'You need to sign in'
		if not query then throw new Meteor.Error 'You entered empty query'
		if query.search(regexp) isnt -1
			throw new Meteor.Error "The request must begin with a letter"
		if query.length <= 2 then throw new Meteor.Error 'You entered less than two characters'
		if query.search(regexp2) isnt -1
			throw new Meteor.Error 'The request contains invalid characters'

		params =
			client_id: CLIENT_ID
			client_secret: CLIENT_SECRET
			v: FOURSQUARE_VERSION
			radius: queryData.radius
			query: query
			ll: queryData.lat + ',' + queryData.lng
			limit: 50

		try
			response = HTTP.get 'https://api.foursquare.com/v2/venues/search', params: params
		catch err
			throw new Meteor.Error err.message

		response.data.response.venues;