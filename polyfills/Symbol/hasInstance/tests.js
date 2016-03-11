it('has the well known symbol hasInstance as static properties on Symbol', function() {
	expect(Symbol.hasInstance).to.not.be.undefined;

	var hasInstance = Symbol.hasInstance;
	Symbol.hasInstance = "nope";
	expect(Symbol.hasInstance).to.be(hasInstance);
});
