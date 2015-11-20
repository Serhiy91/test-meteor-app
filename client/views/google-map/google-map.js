map = undefined;
var LATITUDE = 35.6833;
var LONGITUDE = 139.7833;
var ZOOM = 11;

//load map
Meteor.startup(function() {
	GoogleMaps.load();
});
Template.map.helpers({
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(LATITUDE, LONGITUDE),
				zoom: ZOOM,
				mapTypeControl: true,
				mapTypeControlOptions: {
					position: google.maps.ControlPosition.BOTTOM_LEFT,
					mapTypeIds: [
						google.maps.MapTypeId.ROADMAP,
						google.maps.MapTypeId.SATELLITE
					]
				}
			};
		}
	}
});

Template.map.onCreated(function() {
	GoogleMaps.ready('map', function(googleMap) {
		map = new Map(googleMap.instance);
		//set form into google map
		var form = document.getElementsByClassName('main-form')[0];
		form.getElementsByClassName('form-control')[0].style.display = 'block';
		googleMap.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(form);
	});
});

Template.map.events({
	'submit .main-form': function(e) {
		e.preventDefault();
		var regexp = /[\d \s().+~`!@#$%&=\\|]/;
		var lastQuery = Queries.findOne({}, {sort: {date: -1}});
		var query = e.target[0].value;

		if(!Meteor.user()) {
			throwError('You need to sign in');
			return;
		}

		if (!query) {
			throwError('Please enter some request');
			return;
		}

		if (query.length < 2) {
			throwError('This request is not allowed');
			return;
		}

		if (query.search(regexp) !== -1) {
			throwError('The request contains invalid characters');
			return;
		}

		//get google map data for request to foursquare
		var queryObject = map.getCurrentState();
		queryObject.query = query;

		if (lastQuery) {
			if (queryObject.query === lastQuery.query &&
				queryObject.lat === lastQuery.lat &&
				queryObject.lng === lastQuery.lng) {
				return;
			}
		}

		//make request to foursquare
		Meteor.call('searchVenues', queryObject, function(err, venues) {
			if (err) {
				throwError('Sorry, the request was unsuccessful');
				return;
			}

			Meteor.call('addQuery', queryObject, function(err) {
				if (err) {
					throwError('Sorry, the request was unsuccessful');
				}
			});

			Venues.remove({});
			_.each(venues, function(venue) {
				Venues.insert(venue);
			});
		});
	}
});