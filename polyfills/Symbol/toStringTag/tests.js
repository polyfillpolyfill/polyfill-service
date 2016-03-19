it('has the well known symbol toStringTag as static properties on Symbol', function() {
	expect(Symbol.toStringTag).to.not.be.undefined;

	var toStringTag = Symbol.toStringTag;
	Symbol.toStringTag = "nope";
	expect(Symbol.toStringTag).to.be(toStringTag);
});
