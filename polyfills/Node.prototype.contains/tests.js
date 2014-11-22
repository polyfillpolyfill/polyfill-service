describe('on an element', function () {
	var
	documentElement = document.documentElement,
	documentHead = document.getElementsByTagName('head')[0],
	detached = document.createElement('div');

	it('is a function', function () {
		expect(documentElement.contains).to.be.a('function');
	});

	it('expects one argument', function () {
		expect(documentElement.contains.length).to.be(1);
	});

	it('functions correctly', function () {
		expect(documentElement.contains(documentElement)).to.be(true);
		expect(documentElement.contains(documentHead)).to.be(true);

		expect(documentHead.contains(documentElement)).to.be(false);
		expect(documentHead.contains(null)).to.be(false);
	});

	it('functions correctly (on detached elements)', function () {
		expect(detached.contains(detached)).to.be(true);

		expect(documentElement.contains(detached)).to.be(false);
		expect(detached.contains(documentElement)).to.be(false);
		expect(documentHead.contains(null)).to.be(false);
	});

	it('throws when missing the argument', function () {
		expect(function () {
			documentElement.contains();
		}).to.throwException();
	});
});

describe('on the document', function () {
	var
	documentElement = document.documentElement,
	documentHead = document.getElementsByTagName('head')[0],
	detached = document.createElement('div');

	it('is a function', function () {
		expect(document.contains).to.be.a('function');
	});

	it('expects one argument', function () {
		expect(document.contains.length).to.be(1);
	});

	it('functions correctly', function () {
		expect(document.contains(document)).to.be(true);
		expect(document.contains(documentElement)).to.be(true);
		expect(document.contains(documentHead)).to.be(true);

		expect(document.contains(detached)).to.be(false);
		expect(documentElement.contains(document)).to.be(false);
	});

	it('throws when missing the argument', function () {
		expect(function () {
			document.contains();
		}).to.throwException();
	});
});
