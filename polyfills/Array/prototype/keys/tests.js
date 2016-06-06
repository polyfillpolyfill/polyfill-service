it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect([].keys).to.be.a(Function);
});

it('is named \'keys\'', function () {
	expect([].keys.name).to.equal('keys');
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.keys();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.eql({
		value: 0,
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.keys();
	iterator.next();
	iterator.next();
	expect(iterator.next()).to.eql({
		value: undefined,
		done: true
	});
});
