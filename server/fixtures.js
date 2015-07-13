if (Quotes.find().count() === 0) {
	var starterQuotes = JSON.parse(Assets.getText('quotes.json'));
  _.each(starterQuotes, function(starterQuote) {
    Quotes.insert(starterQuote);
    console.log(starterQuote);
  });
}