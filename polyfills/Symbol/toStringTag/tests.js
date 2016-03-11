it('has the well known symbol iterator as static properties on Symbol', function() {
	expect(Symbol.iterator).to.not.be.undefined;

	var iterator = Symbol.iterator;
	Symbol.iterator = "nope";
	expect(Symbol.iterator).to.be(iterator);
});
