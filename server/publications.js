Meteor.publish('queries', function(sort, limit) {
	//use publish-counts package for get all document count on the client
	Counts.publish(this, 'queriesCounter', Queries.find({userId: this.userId}));
	return Queries.find({userId: this.userId}, {sort: sort, limit: limit});
});