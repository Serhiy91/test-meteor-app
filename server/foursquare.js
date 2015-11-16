var CLIENT_ID = 'PQGQXQWPGGJHOUZVU52H0MPRLYK4UTHNWYK5VKXCO04BTU5R';
var CLIENT_SECRET = '3I24GNJQCNQSKS5ICC22ZWJ32MVFUKAZIYG222MV2RLCM4QR';
var FOURSQUARE_VERSION = '20130815';

Meteor.methods({
	'searchVenues': function(queryData) {
		var params = {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			v: FOURSQUARE_VERSION,
			radius: queryData.radius * 1000,
			query: queryData.query,
			ll: queryData.lat + ',' + queryData.lng
		};

		var result = HTTP.get('https://api.foursquare.com/v2/venues/search', {params: params});
		return result.data.response.venues;
	}
});