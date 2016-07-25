
it('is named \'entries\'', function () {
	// Don't fail tests just because browser doesn't support the Function.name polyfill
	if ([].entries.name) {
		expect([].entries.name).to.equal('entries' || undefined);
	}
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.entries();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.eql({
		value: [0, 'val1'],
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.entries();
	iterator.next();
	iterator.next();
	expect(iterator.next()).to.eql({
		value: undefined,
		done: true
	});
});
