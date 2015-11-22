Map = function(map) {
	this.map = map;
	this.WIDTH_LNG = 111111;
	this.markers = {};
	this.openInfoWindow = undefined;
};

//get current data (lat, lng, zoom ...)
Map.prototype.getCurrentState = function() {
	var bounds = this.map.getBounds();
	var centerCords = {
		lat: bounds.getCenter().lat(),
		lng: bounds.getCenter().lng()
	};
	var northEastLat = bounds.getNorthEast().lat();
	var distance = (northEastLat - centerCords.lat) * this.WIDTH_LNG;

	return {
		lat: centerCords.lat,
		lng: centerCords.lng,
		radius: distance,
		zoom: this.map.getZoom()
	};
};

Map.prototype.addMark = function(venue) {
	var self = this;
	var infoText = '<strong>' + venue.name + '</strong><br />' + venue.location.city + ' ' + venue.location.address;

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
		map: self.map,
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
			self.openInfoWindow.close(self.map);
		}
		marker.info.open(self.map, marker);
		self.openInfoWindow = marker.info;
	});

	//store all current markers
	self.markers[venue._id] = marker;
};

Map.prototype.updateMark = function(newVenue) {
	//change marker icon if venue was checked in venues-list
	var self = this;
	var mark = self.markers[newVenue._id];
	if (newVenue.checked) {
		setIcon(mark, '/images/blue-dot.png');
	} else {
		setIcon(mark, '');
	}
	function setIcon(mark, icon) {
		mark.setMap(null);
		mark.icon = icon;
		mark.setMap(self.map);
	}
};

Map.prototype.removeMark = function(venue) {
	this.markers[venue._id].setMap(null);
	google.maps.event.clearInstanceListeners(this.markers[venue._id]);
	delete this.markers[venue._id];
};

Map.prototype.setMapState = function(queryData) {
	this.map.setCenter(new google.maps.LatLng(queryData.lat, queryData.lng));
	this.map.setZoom(queryData.zoom);
};