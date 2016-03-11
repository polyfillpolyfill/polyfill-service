it('has the well known symbol replace as static properties on Symbol', function() {
	expect(Symbol.replace).to.not.be.undefined;

	var replace = Symbol.replace;
	Symbol.replace = "nope";
	expect(Symbol.replace).to.be(replace);
});
