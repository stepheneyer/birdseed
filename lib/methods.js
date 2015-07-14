Meteor.methods({
  addTweet: function (tweetURL) {
  // Make sure the user is logged in before inserting a tweet
  if (! Meteor.userId()) {
    throw new Meteor.Error("not-authorized");
  }

    Tweets.insert({
      tweet: tweetURL,
      owner: Meteor.userId(),
      createdAt: new Date ()
    });
    console.log(tweetURL);
  }
});