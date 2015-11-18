Venues = new Meteor.Collection(null);
var markers = [];
var openInfoWindow;

//make reactive map markers
Venues.find().observe({
	added: function(venue) {
		var map = GoogleMaps.maps.map.instance;
		var infoText = '<strong>' + venue.name + '</strong><br />' + venue.location.city + ' ' + venue.location.address;

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
			map: map,
			title: venue.name
		});

		//show window with venue info by clicking on the mark
		marker.info = new google.maps.InfoWindow({
			content: infoText
		});
		google.maps.event.addListener(marker, 'click', function() {
			//show only one info window at one time
			if (openInfoWindow) openInfoWindow.close(map);
			marker.info.open(map, marker);
			openInfoWindow = marker.info;
		});

		markers.push(marker);
	},
	removed: function() {
		if (markers.length !== 0) {
			_.each(markers, function(marker) {
				marker.setMap(null);
			});
			markers = [];
		}
	}
});

Template.venuesList.helpers({
	venues: function() {
		return Venues.find();
	},
	venuesCount: function() {
		return Venues.find().count();
	}
});

Template.venuesList.events({
	'click .csv': function() {
		exportVenues();
	}
});