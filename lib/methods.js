Meteor.methods({
  saveTweet: function (tweetData, tweetQuote) {
  // Make sure the user is logged in before inserting a tweet
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

    Tweets.insert({
      tweetText: tweetQuote,
      tweetImg: tweetData,
      owner: Meteor.userId(),
      createdAt: new Date ()
    });
    console.log("Saved!");
  }
});
