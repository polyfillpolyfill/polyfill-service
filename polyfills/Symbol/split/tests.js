it('has the well known symbol split as static properties on Symbol', function() {
	expect(Symbol.split).to.not.be.undefined;

	var split = Symbol.split;
	Symbol.split = "nope";
	expect(Symbol.split).to.be(split);
});
