@Venues = new Meteor.Collection(null)

#make reactive map markers
Venues.find().observe
	added: (venue) ->
		map.addMark venue
	changed: (newVenue) ->
		map.updateMark newVenue
	removed: (venue) ->
		map.removeMark venue