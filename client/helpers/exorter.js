MyAppExporter = {
	exportVenues: function() {
		var self = this;
		var fields = [
			'Name',
			'City',
			'Street Address'
		];
		var data = [];
		var venues = Venues.find().fetch();
		_.each(venues, function(venue) {
			data.push([
				venue.name,
				venue.location.city,
				venue.location.address
			]);
		});

		var csv = Papa.unparse({fields: fields, data: data});
		self._downloadCSV(csv);
	},
	_downloadCSV: function(csv) {
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
		a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
		a.download = "contacts.csv";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
};