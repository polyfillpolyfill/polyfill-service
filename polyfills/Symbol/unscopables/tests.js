it('has the well known symbol unscopables as static properties on Symbol', function() {
	expect(Symbol.unscopables).to.not.be.undefined;

	var unscopables = Symbol.unscopables;
	Symbol.unscopables = "nope";
	expect(Symbol.unscopables).to.be(unscopables);
});
