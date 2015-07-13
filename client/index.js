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
            showNavigation: 'auto',
            fields: [
            { key: 'quote', label: 'Quote' },
            { key: 'author', label: 'Author' },
            { key: 'category', label: 'Category'}
            ]
        };
    }
});

  Template.filter.events({
  'click .reactive-table tr': function (event) {
    event.preventDefault();
    var row = this;
    var fullQuote = row.quote + ' -' + row.author;
    console.log(fullQuote);
  }
});
}