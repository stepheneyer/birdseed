if (Meteor.isClient) {
  
  Meteor.subscribe('quotes');

  // This code only runs on the client
  Template.body.helpers({
    quotes: function() {
    return Quotes.find();
  }
});
}