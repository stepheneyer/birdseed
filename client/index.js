if (Meteor.isClient) {
  
  Meteor.subscribe('quotes');
  Meteor.subscribe('tweets');

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
      document.getElementById("saveBtn").className = "show";
      var row = this;
      var fullQuote = row.quote + '\n\n' + ' - ' + row.author;

      var quoteWithMarks = "'" + row.quote + "'" + ' -' + row.author;
      tweetQuote = truncate(quoteWithMarks);

      var canvas = new fabric.Canvas('c');
      var img = new Image();
      img.onload = function(){
      canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas), {
            originX: 'left',
            originY: 'top',
            left: 0,
            top: 0
        });
      };
      img.src = "http://localhost:3000/birdseed_quotation_marks.png";
      canvas.setHeight(220);
      canvas.setWidth(440);
      var text = new fabric.Text(fullQuote, { 
        fontFamily: 'Arial',
        fontSize: 16,
        left: 90,
        top: 100,
        selectable: false
      });
      canvas.add(text);
    },
      'click #saveBtn' : function (event) {
      event.preventDefault();
      var canvasSelect = document.getElementById("c");

      // images saved to db need to have header removed for direct publish to Twitter API
      var tweetData = canvasSelect.toDataURL("image/png").replace("data:image/png;base64,", "");
      Meteor.call("saveTweet", tweetData, tweetQuote);
    }
});
}

function truncate(string) {
  if (string.length > 127)
      return string.substring(0,127)+'...';
  else
      return string; 
}