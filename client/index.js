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
      var row = this;
      var fullQuote = row.quote + '\n' + ' -' + row.author;
      console.log(fullQuote.length);
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
        top: 100
      });
      canvas.add(text);
    },
      'click #saveBtn' : function (event) {
      event.preventDefault();
      var canvasSelect = document.getElementById("c");
      var tweetURL = canvasSelect.toDataURL("image/png");
      // var image = canvasSelect.toDataURL("image/png").replace("image/png", "image/octet-stream");
      // window.location.href = image;
      // document.write('<img src="'+image+'"/>');
      Meteor.call("addTweet", tweetURL);
    }
});
}
