Meteor.publish('queries', function(limit) {
	//use publish-counts package for get all document count on the client
	Counts.publish(this, 'queriesCounter', Queries.find({userId: this.userId}));
	return Queries.find({userId: this.userId}, {sort: {date: -1}, limit: limit});
});