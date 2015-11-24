LIMIT_QUERIES = 4;
NO_LIMIT = 0;

Meteor.startup ->
	Session.set 'limitPrevQueries', LIMIT_QUERIES

# Subscribe to data and set limit value
Deps.autorun ->
	Meteor.subscribe 'queries', Session.get 'limitPrevQueries'

Template.prevQueries.helpers
	queries: ->
		Queries.find {},
			sort:
				date: 1
			limit: Session.get 'limitPrevQueries'
	isMore4Queries: ->
		# Get document count from Queries collection
		Counts.get('queriesCounter') > LIMIT_QUERIES

Template.prevQueries.events
	# Button for switching between two list state
	'click .query-toggle button': (e) ->
		limit = Session.get 'limitPrevQueries'
		label = e.currentTarget.previousElementSibling
		icon = e.currentTarget.firstElementChild
		if limit
			limit = NO_LIMIT
			label.innerHTML = 'Show last 4 queries'
			icon.className = 'glyphicon glyphicon-chevron-down'
		else
			limit = LIMIT_QUERIES
			label.innerHTML = 'Show all queries'
			icon.className = 'glyphicon glyphicon-chevron-up'
		Session.set 'limitPrevQueries', limit

	'click .delete-query': (e) ->
		delQueryElem = e.currentTarget
		simpleBtn = delQueryElem.lastElementChild
		simpleBtn.firstElementChild.className = 'glyphicon glyphicon-question-sign'

		# Create and insert loading element into delete button
		delayBtn = document.createElement 'div'
		delayBtn.className = 'delay-btn'
		delQueryElem.insertBefore delayBtn, simpleBtn

		removeVenue = =>
			@removeUIFlicker()
			Queries.remove @_id

		# Add event listener for deleting query by second click
		delQueryElem.addEventListener('click', removeVenue)

		#remove event listener and loading element in 2 sec if there is not second click
		setTimeout ->
			delQueryElem.removeEventListener('click', removeVenue)
			delQueryElem.removeChild delayBtn
			simpleBtn.firstElementChild.className = 'glyphicon glyphicon-trash'
		, 2000

		# Ugly hack for delete map flicker
		@removeUIFlicker = =>
			container = delQueryElem.parentNode.parentNode
			containerHeight = container.offsetHeight
			if Counts.get('queriesCounter') > LIMIT_QUERIES + 1 and Session.get 'limitPrevQueries'
				container.style.minHeight = containerHeight + 'px'

				res = ->
					container.style.minHeight = ''
					window.removeEventListener 'resize', res
				window.addEventListener 'resize', res
			else
				if container.style.minHeight
					container.style.minHeight = ''
		# ugly hack

	'click .request': (e) ->
		e.preventDefault()
		queryObject =
			query: @query
			lat: @lat
			lng: @lng
			radius: @radius
			zoom: @zoom

		map.setMapState queryObject # Set new options for google map
		Session.set 'spinner', true # Spinner start

		#make request to foursquare
		Meteor.call 'searchVenues', queryObject, (err, venues) ->
			Session.set 'spinner', false # Spinner finish
			if err
				throwError 'Sorry, the request was unsuccessful'
				return

			Venues.remove({})
			Venues.insert venue for venue in venues