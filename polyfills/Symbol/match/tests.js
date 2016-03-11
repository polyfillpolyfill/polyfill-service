it('has the well known symbol match as static properties on Symbol', function() {
	expect(Symbol.match).to.not.be.undefined;

	var match = Symbol.match;
	Symbol.match = "nope";
	expect(Symbol.match).to.be(match);
});
