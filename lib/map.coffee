class @Map
	constructor: (@map) ->
		@WIDTH_LNG = 111111
		@markers = {}
		@openInfoWindow

	# Get current data (lat, lng, zoom ...)
	getCurrentState: ->
		bounds = @map.getBounds()
		centerCords =
			lat: bounds.getCenter().lat()
			lng: bounds.getCenter().lng()
		northEastLat = bounds.getNorthEast().lat()
		distance = (northEastLat - centerCords.lat) * @WIDTH_LNG

		lat: centerCords.lat
		lng: centerCords.lng
		radius: distance
		zoom: @map.getZoom()

	addMark: (venue) ->
		infoText = "<strong>#{venue.name}</strong><br />#{venue.location.city or= ''} #{venue.location.address or= ''}"
		marker = new google.maps.Marker
			position: new google.maps.LatLng(venue.location.lat, venue.location.lng)
			map: @map
			title: venue.name
			icon: ''

		# Show window with venue info by clicking on the mark
		marker.info = new google.maps.InfoWindow content: infoText
		google.maps.event.addListener marker, 'click', =>

			#show only one info window at one time
			if @openInfoWindow then @openInfoWindow.close @map
			marker.info.open @map, marker
			@openInfoWindow = marker.info

		#store all current markers
		@markers[venue._id] = marker

	updateMark: (newVenue) ->
		#change marker icon if venue was checked in venues-list
		mark = @markers[newVenue._id]

		setIcon = (mark, icon) =>
			mark.setMap null
			mark.icon = icon
			mark.setMap @map

		if newVenue.checked
			setIcon mark, '/images/blue-dot.png'
		else
			setIcon mark, ''

	removeMark: (venue) ->
		@markers[venue._id].setMap null
		google.maps.event.clearInstanceListeners @markers[venue._id]
		delete @markers[venue._id]

	setMapState: (queryData) ->
		@map.setCenter(new google.maps.LatLng queryData.lat, queryData.lng)
		@map.setZoom queryData.zoom