it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect([][Symbol.iterator]).to.be.a(Function);
});


it('is named \'values\'', function () {
	// Don't fail tests just because browser doesn't support the Function.name polyfill
	if ([][Symbol.iterator].name) {
		expect([][Symbol.iterator].name).to.equal('values');
	}
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array[Symbol.iterator]();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.eql({
		value: 'val1',
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array[Symbol.iterator]();
	iterator.next();
	iterator.next();
	expect(iterator.next()).to.eql({
		value: undefined,
		done: true
	});
});


