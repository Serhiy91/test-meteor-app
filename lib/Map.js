Map = function() {
	this.R_EARTH = 6378;
	this.RADIANS = 57.2958;
	this.markers = {};
	this.openInfoWindow = undefined;
};

//get current data (lat, lng, zoom ...)
Map.prototype.getCurrentState = function(map) {
	var bounds = map.getBounds();
	var centerCords = {
		lat: bounds.getCenter().lat(),
		lng: bounds.getCenter().lng()
	};
	var northEastRadCords = {
		lat: bounds.getNorthEast().lat() / this.RADIANS,
		lng: bounds.getNorthEast().lng() / this.RADIANS
	};

	var distance = this.R_EARTH * Math.acos(Math.sin(centerCords.lat / this.RADIANS) *
			Math.sin(northEastRadCords.lat) + Math.cos(centerCords.lat / this.RADIANS) *
			Math.cos(northEastRadCords.lat) * Math.cos(northEastRadCords.lng - centerCords.lng / this.RADIANS));

	return {
		lat: centerCords.lat,
		lng: centerCords.lng,
		radius: distance,
		zoom: map.getZoom()
	};
};

Map.prototype.addMark = function(venue, map) {
	var self = this;
	var infoText = '<strong>' + venue.name + '</strong><br />' + venue.location.city + ' ' + venue.location.address;

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
		map: map,
		title: venue.name,
		icon: ''
	});

	//show window with venue info by clicking on the mark
	marker.info = new google.maps.InfoWindow({
		content: infoText
	});
	google.maps.event.addListener(marker, 'click', function() {
		//show only one info window at one time
		if (self.openInfoWindow) {
			self.openInfoWindow.close(map);
		}
		marker.info.open(map, marker);
		self.openInfoWindow = marker.info;
	});

	//store all current markers
	self.markers[venue._id] = marker;
};

Map.prototype.updateMark = function(newVenue, map) {
	//change marker icon if venue was checked in venues-list
	var mark = this.markers[newVenue._id];
	if (newVenue.checked) {
		setIcon(mark, '/images/blue-dot.png');
	} else {
		setIcon(mark, '');
	}
	function setIcon(mark, icon) {
		mark.setMap(null);
		mark.icon = icon;
		mark.setMap(map);
	}
};

Map.prototype.removeMark = function(venue) {
	this.markers[venue._id].setMap(null);
	google.maps.event.clearInstanceListeners(this.markers[venue._id]);
	delete this.markers[venue._id];
};

Map.prototype.setMapState = function(queryData, map) {
	map.setCenter(new google.maps.LatLng(queryData.lat, queryData.lng));
	map.setZoom(queryData.zoom);
};