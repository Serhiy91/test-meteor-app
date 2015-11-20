UI.registerHelper('formatTime', function(context) {
	if(context)
		return moment(context).format('MMM DD hh:mm');
});

UI.registerHelper('formatLatLng', function(context) {
	if(context)
		return context.toFixed(6);
});

UI.registerHelper('formatDistance', function(context) {
	if(context)
		return context.toFixed(1) + 'km';
});

UI.registerHelper('formatText', function(context) {
	if(!context) {
		return 'data not available';
	} else {
		return context;
	}

});