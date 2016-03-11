it('has the well known symbol isConcatSpreadable as static properties on Symbol', function() {
	expect(Symbol.isConcatSpreadable).to.not.be.undefined;

	var isConcatSpreadable = Symbol.isConcatSpreadable;
	Symbol.isConcatSpreadable = "nope";
	expect(Symbol.isConcatSpreadable).to.be(isConcatSpreadable);
});
