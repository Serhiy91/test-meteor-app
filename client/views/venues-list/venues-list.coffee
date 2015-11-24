Template.venuesList.helpers
	venues: -> Venues.find(),
	venuesCount: -> Venues.find().count()

Template.venuesList.events
	'click .table tbody tr': (e) ->
		Venues.update @_id,
			$set:
				checked: not @checked
		e.currentTarget.className = if not @checked then 'checked' else ''

	'click .csv': ->
		# Fields of csv headers
		fields = ['Name', 'City', 'Street Address']
		venues = Venues.find().fetch()

		# Get necessary data for csv file
		data = ([venue.name, venue.location.city, venue.location.address] for venue in venues)

		# Parse into csv format
		csv = Papa.unparse fields: fields, data: data

		# Downloading csv file
		blob = new Blob [csv]
		a = window.document.createElement 'a'
		a.href = window.URL.createObjectURL blob, type: 'text/plain'
		a.download = 'venues.csv'
		document.body.appendChild a
		a.click()
		document.body.removeChild a