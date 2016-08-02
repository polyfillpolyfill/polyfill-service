function getDOMTokenList () {
	var div = document.createElement('div');
	div.className = 'class1 class2';
	return div.classList();
}

it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect(getDOMTokenList()[Symbol.iterator]).to.be.a(Function);
});

it('returns a next-able object', function () {
	var tokenList = getDOMTokenList();
	var iterator = tokenList[Symbol.iterator]();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.deep.equal({
		value: 'class1',
		done: false
	});
});

it('finally returns a done object', function () {
	var tokenList = getDOMTokenList();
	var iterator = tokenList[Symbol.iterator]();
	iterator.next();
	expect(iterator.next()).to.deep.equal({
		done: false
	});
});
