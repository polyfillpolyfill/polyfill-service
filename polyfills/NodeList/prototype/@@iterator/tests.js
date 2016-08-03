function getNodeList () {
	var fragment = document.createDocumentFragment();
	fragment.appendChild(document.createElement('div'));
	fragment.appendChild(document.createElement('div'));
	return fragment.childNodes;
}

it('exists', function () {
	if (!Symbol || !Symbol.iterator) {
		expect(true).to.be.false;
		return;
	}
	expect(getNodeList()[Symbol.iterator]).to.be.a(Function);
});

it('returns a next-able object', function () {
	var nodeList = getNodeList();
	var iterator = nodeList[Symbol.iterator]();

	expect(iterator.next).to.be.a(Function);
	expect(iterator.next()).to.eql({
		value: nodeList[0],
		done: false
	});
});

it('finally returns a done object', function () {
	var nodeList = getNodeList();
	var iterator = nodeList[Symbol.iterator]();
	iterator.next();
	iterator.next();
	expect(iterator.next()).to.eql({
		done: true,
		value: undefined
	});
});
