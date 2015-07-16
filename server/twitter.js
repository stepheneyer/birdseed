if (Meteor.isServer) {
    Meteor.startup(function() {
        //code to run on server at startup

        var apikeys = {
            consumer_key: Meteor.settings.twitter_consumer_key,
            consumer_secret: Meteor.settings.twitter_consumer_secret,
            access_token: Meteor.settings.twitter_access_token_key,
            access_token_secret: Meteor.settings.twitter_access_token_secret
        };

        var Twit = Meteor.npmRequire('twit');

        var T = new Twit(apikeys);

        Tweets.after.insert(function(userId, doc) {

            //upload new tweet data first

            T.post('media/upload', {
                    media_data: doc.tweetImg
                },

                Meteor.bindEnvironment(function(err, data, response) {
                    console.log(data);

                    // now we can reference the media and post a tweet (media will attach to the tweet)

                    var mediaIdStr = data.media_id_string;
                    var params = {
                        status: doc.tweetText + ' #birdseed',
                        media_ids: [mediaIdStr]
                    };

                    T.post('statuses/update', params,

                        Meteor.bindEnvironment(function(err, data, response) {
                            console.log(data);
                        })
                    );  
                })
            );
        });
    });
}
