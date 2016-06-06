it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect([].entries).to.be.a(Function);
});

it('is named \'entries\'', function () {
	expect([].entries.name).to.equal('entries');
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
