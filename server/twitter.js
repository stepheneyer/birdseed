if (Meteor.isServer) {
  Meteor.startup(function () {
    //code to run on server at startup

	var apikeys = {
    	consumer_key: Meteor.settings.twitter_consumer_key,
    	consumer_secret: Meteor.settings.twitter_consumer_secret,
    	access_token: Meteor.settings.twitter_access_token_key,
    	access_token_secret: Meteor.settings.twitter_access_token_secret
	};

	// var Twit = Meteor.npmRequire('twit');

	// var T = new Twit(apikeys);

	// T.get('followers/ids', 
	// 		{
	// 			screen_name: 'stepheneyer',
	// 		},
	// 		Meteor.bindEnvironment(function(err, data, response) {
	// 			console.log(data);
	// 		})
 // 		);
	
	});
}
