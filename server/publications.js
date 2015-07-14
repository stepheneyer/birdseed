Meteor.publish('quotes', function() {
	return Quotes.find();
});

Meteor.publish('tweets', function() {
	return Tweets.find();
});