Meteor.publish('queries', function(sort, limit) {
	return Queries.find({userId: this.userId}, {sort: sort, limit: limit});
});