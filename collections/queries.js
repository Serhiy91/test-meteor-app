Queries = new Meteor.Collection('queries');

Meteor.methods({
	addQuery: function(query) {
		var user = Meteor.user();
		if (!Meteor.userId()) {
			alert("You need to login to post new stories");
			return;
		}

		query = _.extend(_.pick(query, 'query', 'lat', 'lng', 'radius'), {
			userId: user._id,
			date: new Date().getTime()
		});

		return Queries.insert(query);
	},
	deleteQuery: function(queryId) {
		if (!Meteor.userId()) {
			alert("You need to login to post new stories");
			return;
		}
		Queries.remove(queryId);
	}
});