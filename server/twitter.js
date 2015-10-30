if (Meteor.isServer) {

	Accounts.onLogin(function(user) {

		var apikeys = {
	        consumer_key: Meteor.settings.twitter.consumer_key,
	        consumer_secret: Meteor.settings.twitter.consumer_secret,
	        access_token: user.user.services.twitter.accessToken,
	        access_token_secret: user.user.services.twitter.accessTokenSecret
	    };

	    Twit = Meteor.npmRequire('twit');

	    T = new Twit(apikeys);
	});


    Tweets.after.insert(function(userId, doc) {

        //upload new tweet data first
        T.post('media/upload', {
                media_data: doc.tweetImg
            },

            function(err, data, response) {
                console.log(data);

                // now we can reference the media and post a tweet (media will attach to the tweet)
                var mediaIdStr = data.media_id_string;
                var params = {
                    status: doc.tweetText + ' #birdseed',
                    media_ids: [mediaIdStr]
                };

                T.post('statuses/update', params,
                    function(err, data, response) {
                        console.log(data);
                    }
                );  
            }
        );
    });
}
