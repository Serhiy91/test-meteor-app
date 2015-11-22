var LIMIT_QUERIES = 4;
var NO_LIMIT = 0;

Meteor.startup(function () {
	Session.set('limitPrevQueries', LIMIT_QUERIES);
});

//subscribe to data and set limit value
Deps.autorun(function() {
	Meteor.subscribe('queries', {date: -1}, Session.get('limitPrevQueries'));
});

Template.prevQueries.helpers({
	queries: function() {
		return Queries.find({}, {sort: {date: 1}, limit: Session.get('limitPrevQueries')});
	},
	isMore4Queries: function() {
		//get document count from Queries collection
		return Counts.get('queriesCounter') > LIMIT_QUERIES;
	}
});

Template.prevQueries.events({
	//button for switching between two list state
	'click .query-toggle button': function(e) {
		var limit = Session.get('limitPrevQueries');
		var label = e.currentTarget.previousElementSibling;
		var icon = e.currentTarget.firstElementChild;

		if (limit) {
			limit = NO_LIMIT;
			label.innerHTML = 'Show last 4 queries';
			icon.className = 'glyphicon glyphicon-chevron-down';
		} else {
			limit = LIMIT_QUERIES;
			label.innerHTML = 'Show all queries';
			icon.className = 'glyphicon glyphicon-chevron-up';
		}

		Session.set('limitPrevQueries', limit);
	},
	'click .delete-query': function(e) {
		//ugly hack
		var preQueElem = e.currentTarget.parentNode.parentNode;
		if (Counts.get('queriesCounter') > LIMIT_QUERIES + 1) {
			preQueElem.style.height = '240px';
			Queries.remove(this._id);
		} else {
			preQueElem.style.height = '';
			Queries.remove(this._id);
		}
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