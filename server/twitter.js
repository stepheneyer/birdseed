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

        // Tweets.after.insert(function(userId, doc) {
        //     console.log("The console log is:" + doc.tweetImg);

        //     //upload new tweet data first

        //     T.post('media/upload', {
        //             media_data: doc.tweetImg
        //         },

        //         Meteor.bindEnvironment(function(err, data, response) {
        //             console.log(data);

        //             // now we can reference the media and post a tweet (media will attach to the tweet)

        //             var mediaIdStr = data.media_id_string;
        //             var params = {
        //                 status: 'Someone wiser than me once said... #birdseed',
        //                 media_ids: [mediaIdStr]
        //             };

        //             T.post('statuses/update', params,

        //                 Meteor.bindEnvironment(function(err, data, response) {
        //                     console.log(data);
        						// if (!err) {
        							// FlashMessages.sendSuccess("Your Tweet was published! See it on <a href='http://www.twitter.com'>Twitter.</a>", { hideDelay: 10000 });
        						// }
        //                 })
        //             );
        //         })
        //     );
        // });
    });
}
