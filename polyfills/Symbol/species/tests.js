it('has the well known symbol species as static properties on Symbol', function() {
	expect(Symbol.species).to.not.be.undefined;

	var species = Symbol.species;
	Symbol.species = "nope";
	expect(Symbol.species).to.be(species);
});
