if (Quotes.find().count() === 0) {
	Quotes.insert({
		qid: '1',
		quote: 'I attribute my success to this: I never gave or took any excuse.',
		credit: 'Florence Nightingale',
		category: 'Famous'
	});

  	Quotes.insert({
    	qid: '2',
    	quote: 'Strive not to be a success, but rather to be of value.',
    	credit: 'Albert Einstein',
    	category: 'Famous'
  	});

  	Quotes.insert({
    	qid: '3',
    	quote: 'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
    	credit: 'Robert Frost',
    	category: 'Famous'
  	});
}