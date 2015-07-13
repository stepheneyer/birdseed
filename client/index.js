if (Meteor.isClient) {
  
  Meteor.subscribe('quotes');

  // This code only runs on the client
  Template.body.helpers({
    quotes: function() {
    return Quotes.find();
  }
});

  Template.filter.helpers({
      settings: function () {
        return {
            collection: Quotes,
            rowsPerPage: 10,
            showFilter: true,
            useFontAwesome: true,
            fields: ['quote', 'credit', 'category']
        };
    }
});

}