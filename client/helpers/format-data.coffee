UI.registerHelper 'formatTime', (context) ->
	if context then moment(context).format('MMM DD hh:mm')

UI.registerHelper 'formatLatLng', (context) ->
	if context then context.toFixed(6)

UI.registerHelper 'formatDistance', (context) ->
	if context then (context / 1000).toFixed(1) + 'km'