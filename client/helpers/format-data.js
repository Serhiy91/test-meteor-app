UI.registerHelper('formatTime', function(context, options) {
	if(context)
		return moment(context).format('MMM DD hh:mm');
});

UI.registerHelper('formatLatLng', function(context, options) {
	if(context)
		return context.toFixed(6);
});

UI.registerHelper('formatDistance', function(context, options) {
	if(context)
		return context.toFixed(1) + 'km';
});