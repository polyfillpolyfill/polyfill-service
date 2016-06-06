it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect([][Symbol.iterator]).to.be.a(Function);

});

//TODO test for function name'

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array[Symbol.iterator]();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.deep.equal({
		value: 'val1',
		done: false
	});
});

it('finally returns a done object', function () {
	var array = [];
	var iterator = array[Symbol.iterator]();
	iterator.next();
	iterator.next();
	expect(iterator.next()).to.deep.equal({
		done: true
	});
});


