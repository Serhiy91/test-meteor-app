Queries = new Meteor.Collection('queries');

Queries.allow({
	remove: function(userId, doc) {
		return doc && doc.userId === userId;
	}
});

Meteor.methods({
	addQuery: function(query) {
		var user = Meteor.user();
		if (!Meteor.userId()) {
			alert("You need to login to post new stories");
			return;
		}

		//allow only necessary properties for query object and extend the query object by new
		// properties
		query = _.extend(_.pick(query, 'query', 'lat', 'lng', 'radius', 'zoom'), {
			userId: user._id,
			date: new Date().getTime()
		});

		return Queries.insert(query);
	}
});