it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect([].values).to.be.a(Function);
	expect([].values).to.equal([][Symbol.iterator]);
});

it('is named \'values\'', function () {
	expect([].values.name).to.equal('values');
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.values();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.eql({
		value: 'val1',
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.values();
	iterator.next();
	iterator.next();
	expect(iterator.next()).to.eql({
		value: undefined,
		done: true
	});
});
