if (Meteor.isClient) {
  
    Meteor.startup(function(){
    // initialize once, on document ready
    // create new blank canvas on page
    canvas = new fabric.Canvas('c', { width: 660, height: 330});
  });

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

  var canvas, img, text; // store variables in outer scope

  Template.filter.events({
      'click .reactive-table tr': function (event) {
        event.preventDefault();
        canvas.remove(text);

        document.getElementById("saveBtn").className = "show";
        var row = this;

        if (row.quote !== undefined) {

          // use to make image
          var fullQuote = row.quote + '\n\n' + ' - ' + row.author;

          // use this text with quotes for status update
          var quoteWithMarks = "'" + row.quote + "'" + ' -' + row.author;
          tweetQuote = truncate(quoteWithMarks);

          // set background image to canvas
          img = new Image();
          img.onload = function(){  
          canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas), {
                originX: 'left',
                originY: 'top',
                left: 0,
                top: 0
            });
          };
          img.src = "http://localhost:3000/birdseed_quotation_marks.png";
          
          // create new text element and add quote
          text = new fabric.IText(fullQuote, { 
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#ffffff',
            left: 90,
            top: 100,
          });
          canvas.add(text);
          canvas.renderAll();
        }
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


// UTILITY

function truncate(string) {
  if (string.length > 127)
      return string.substring(0,127)+'...';
  else
      return string; 
}