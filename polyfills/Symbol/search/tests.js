it('has the well known symbol search as static properties on Symbol', function() {
	expect(Symbol.search).to.not.be.undefined;

	var search = Symbol.search;
	Symbol.search = "nope";
	expect(Symbol.search).to.be(search);
});
