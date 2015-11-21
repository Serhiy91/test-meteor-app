Deps.autorun(function() {
	var limit = Session.get('limitPrevQueries');
	limit = limit === 0 ? 0 : 4;
	Meteor.subscribe('queries', {date: -1}, limit);
});

Template.prevQueries.helpers({
	queries: function() {
		var limit = Session.get('limitPrevQueries');
		limit = limit === 0 ? 0 : 4;
		return Queries.find({}, {sort: {date: 1}, limit: limit});
	},
	isMore4Queries: function() {
		return Queries.find().count() > 3;
	},
	isShowAll: function() {
		return Session.get('limitPrevQueries') === 0;
	}
});

Template.prevQueries.events({
	'click .show-all button': function() {
		Session.set('limitPrevQueries', 0);
	},
	'click .show-last-4 button': function() {
		Session.set('limitPrevQueries', 4);
	},
	'click .delete-query': function() {
		Queries.remove(this._id);
	},
	'click .request': function(e) {
		e.preventDefault();
		var queryObject = {
			query: this.query,
			lat: this.lat,
			lng: this.lng,
			radius: this.radius,
			zoom: this.zoom
		};

		//set options for google map
		map.setMapState(queryObject);

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