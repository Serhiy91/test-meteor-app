Template.userInfo.events({
	'click .logout': function(e){
		e.preventDefault();
		Meteor.logout();
	}
});