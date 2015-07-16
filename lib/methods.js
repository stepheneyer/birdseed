Meteor.methods({
  saveTweet: function (tweetData, tweetQuote) {
  // Make sure the user is logged in before inserting a tweet
  if (! Meteor.userId()) {
    FlashMessages.sendError("Please sign in with Twitter to send a tweet.");
  }

    Tweets.insert({
      tweetText: tweetQuote,
      tweetImg: tweetData,
      owner: Meteor.userId(),
      createdAt: new Date ()
    });
    console.log("Saved!");
  },

  tweetSent: function() {
    FlashMessages.sendSuccess("Your Tweet was published! See it on <a href='http://www.twitter.com'>Twitter.</a>", { hideDelay: 10000 });
  }

});
