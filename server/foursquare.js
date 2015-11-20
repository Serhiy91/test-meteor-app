var FOURSQUARE_VERSION = '20130815';

Meteor.methods({
	'searchVenues': function(queryData) {
		if (!CLIENT_ID || !CLIENT_SECRET) {
			throwError('Foursqaure is not configured');
			return;
		}

		if(!Meteor.user()) {
			throwError('You need to sign in');
			return;
		}

		var params = {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			v: FOURSQUARE_VERSION,
			radius: queryData.radius * 1000,
			query: queryData.query,
			ll: queryData.lat + ',' + queryData.lng,
			limit: 50
		};

		try {
			var response = HTTP.get('https://api.foursquare.com/v2/venues/search', {params: params});
		} catch(err) {
			throwError('Sorry, the request to foursquare was unsuccessful');
		}

		return response.data.response.venues;
	}
});