it('has the well known symbol toPrimitive as static properties on Symbol', function() {
	expect(Symbol.toPrimitive).to.not.be.undefined;

	var toPrimitive = Symbol.toPrimitive;
	Symbol.toPrimitive = "nope";
	expect(Symbol.toPrimitive).to.be(toPrimitive);
});
