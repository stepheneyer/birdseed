// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     //code to run on server at startup

// 	var apikeys = {
//     	consumer_key: Meteor.settings.twitter_consumer_key,
//     	consumer_secret: Meteor.settings.twitter_consumer_secret,
//     	access_token: Meteor.settings.twitter_access_token_key,
//     	access_token_secret: Meteor.settings.twitter_access_token_secret
// 	};

// 	// inserts require fibers
// 	Fiber = Npm.require('fibers');

// 	var Twit = Meteor.npmRequire('twit');

// 	var T = new Twit(apikeys);

// 	// get tweet data hook back form server
// 	Tweets.after.insert(function (userId, doc) {
// 		console.log(doc.owner);

//      // first post the media to Twitter
//     T.post('media/upload', { media_data: doc.tweet }, function (err, data, response) {   
 
//      // now we can reference the media and post a tweet (media will attach to the tweet)
//     var mediaIdStr = data.media_id_string;
//     console.log("This is mediaIdStr:" + mediaIdStr);
  	
//   	Fiber(function () {

//     var params = { status: 'Testing...'};

//     T.post('statuses/update', params, function (err, data, response) {
      
//       Meteor.bindEnvironment(function(err, data, response) {
//         console.log("This is Twitter data" + data);
// 		});
// //       });

// 		}).run();
//     });
// 	});
// });
// }