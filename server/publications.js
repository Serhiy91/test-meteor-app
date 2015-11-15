Meteor.publish('queries', function() {
	return Queries.find({userId: this.userId});
});