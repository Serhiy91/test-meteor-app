LATITUDE = 35.6833
LONGITUDE = 139.7833
ZOOM = 11

# Load map
Meteor.startup ->
	GoogleMaps.load()

Template.map.helpers
	mapOptions: ->
		if GoogleMaps.loaded()
			center: new google.maps.LatLng LATITUDE, LONGITUDE
			zoom: ZOOM
			mapTypeControlOptions:
				position: google.maps.ControlPosition.BOTTOM_LEFT
				mapTypeIds: [
					google.maps.MapTypeId.ROADMAP,
					google.maps.MapTypeId.SATELLITE
				]
	isSpinner: ->
		Session.get 'spinner'

Template.map.onCreated =>
	GoogleMaps.ready 'map', (googleMap) =>
		# Create map global object
		@map = new Map googleMap.instance

		# Set form into google map
		form = document.getElementsByClassName('main-form')[0]
		form.getElementsByClassName('form-control')[0].style.display = 'block';
		googleMap.instance.controls[google.maps.ControlPosition.TOP_LEFT].push form

Template.map.events
	'submit .main-form': (e) ->
		e.preventDefault()
		query = e.target[0].value

		if not Meteor.user() then return throwError 'You need to sign in'

		# Get google map data for request to foursquare
		queryObject = map.getCurrentState()
		queryObject.query = query

		# Spinner start
		Session.set 'spinner', true

		# Make request to foursquare
		Meteor.call 'searchVenues', queryObject, (err, venues) ->
			# Spinner finish
			Session.set 'spinner', false
			Venues.remove({})

			if err then return throwError err.message

			# Show warning
			if venues.length is 0 then return throwError('Find 0 venues', true)

			#Add query in Query collection
			Meteor.call 'addQuery', queryObject, (err) ->
				if err then throwError(err.message)

			Venues.insert(venue) for venue in venues
			e.target[0].value = ''