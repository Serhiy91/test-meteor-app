Meteor.subscribe('queries');

Template.prevQueries.helpers({
	queries: function() {
		return Queries.find();
	}
});

Template.prevQueries.events({
	'click .delete': function() {
		Queries.remove(this._id);
	},
	'click .request': function(e) {
		e.preventDefault();
		var queryObject = Queries.findOne(this._id);

		//set options for google map
		map.setMapState(queryObject, GoogleMaps.maps.map.instance);

		//make request to foursquare
		Meteor.call('searchVenues', queryObject, function(err, venues) {
			if (err) {
				throwError('Sorry, the request was unsuccessful');
				return;
			}

			Venues.remove({});
			_.each(venues, function(venue) {
				Venues.insert(venue);
			});
		});
	}
});