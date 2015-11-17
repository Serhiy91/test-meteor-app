exportVenues = function() {
	//fields of csv headers
	var fields = [
		'Name',
		'City',
		'Street Address'
	];

	var data = [];
	var venues = Venues.find().fetch();

	//get necessary data for csv file
	_.each(venues, function(venue) {
		data.push([
			venue.name,
			venue.location.city,
			venue.location.address
		]);
	});

	var csv = Papa.unparse({fields: fields, data: data});

	//downloading csv file
	var blob = new Blob([csv]);
	var a = window.document.createElement("a");
	a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	a.download = "venues.csv";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};