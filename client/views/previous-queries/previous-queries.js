Meteor.subscribe('queries');

Template.prevQueries.helpers({
	queries: function() {
		return Queries.find();
	}
});

Template.prevQueries.events({
	'click .delete': function() {
		Meteor.call('deleteQuery', this._id);
	},
	'click .query': function(e) {
		e.preventDefault();
		var map = GoogleMaps.maps.map.instance;
		var queryObject = Queries.findOne(this._id);

		//set options for google map
		map.setCenter(new google.maps.LatLng(queryObject.lat, queryObject.lng));
		map.setZoom(queryObject.zoom);

		//make request to foursquare
		Meteor.call('searchVenues', queryObject, function(err, venues) {
			Venues.remove({});
			_.each(venues, function(venue) {
				Venues.insert(venue);
			});
		});
	}
});