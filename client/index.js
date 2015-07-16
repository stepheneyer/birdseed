if (Meteor.isClient) {
  
    Meteor.startup(function(){
    // initialize once, on document ready
    // create new blank canvas on page
    canvas = new fabric.Canvas('c', { width: 660, height: 330});
    // canvas.add(new fabric.IText('Choose a quote to get started.', {
    //   fontFamily: 'Arial',
    //   fontSize: 24,
    // }));
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

  var canvas, img, textQuote, textAuthor; // store variables in outer scope

  Template.filter.events({
      'click .reactive-table tr': function (event) {
        event.preventDefault();
        canvas.remove(textQuote, textAuthor);

        document.getElementById("saveBtn").className = "show";
        var row = this;

        if (row.quote !== undefined) {

          // use to make image
          var fullQuote = row.quote + '\n\n' + ' - ' + row.author;

          // use this text with quotes for Twitter status update
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
          textQuote = new fabric.IText(row.quote, { 
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#ffffff',
            left: 90,
            top: 100,
          });
          
          // create new text element and add author
          textAuthor = new fabric.IText(' - ' + row.author, { 
            fontFamily: 'Arial',
            fontSize: 18,
            fill: '#ffffff',
            left: 425,
            top: 180,
          });
          canvas.add(textQuote);
          canvas.add(textAuthor);
          canvas.renderAll();
        }
      },
      'click #saveBtn' : function (event) {
        event.preventDefault();        
        
        if (! Meteor.userId()) {
            FlashMessages.sendError("Please sign in with Twitter to send a tweet.");
        } else {
        
        // remove selection bounding boxes from image before saving it
        canvas.deactivateAll();
        canvas.selection = false;
        canvas.forEachObject(function(o) {
          o.selectable = false;
        });

        // images saved to db need to have header removed for direct publish to Twitter API
        var tweetData = canvas.toDataURL("image/png").replace("data:image/png;base64,", "");
        
        // save quote and image to db and tweet it!
        Meteor.call("saveTweet", tweetData, tweetQuote);

        // notify user that tweet was sent (still needs server hook)
        FlashMessages.sendSuccess("Success! Your tweet was just sent. You can view it by visiting <a href='http://www.twitter.com' target='blank'>Twitter</a>.", { hideDelay: 10000 });
        }
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