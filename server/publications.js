Meteor.publish('queries', function(sort, limit) {
	Counts.publish(this, 'queriesCounter', Queries.find({userId: this.userId}));
	return Queries.find({userId: this.userId}, {sort: sort, limit: limit});
});