it('has correct instance', function () {
	expect(Array.isArray).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(Array.isArray)).to.be('isArray');
});

it('has correct argument length', function () {
	expect(Array.isArray.length).to.be(1);
});

describe('returns true with', function () {
	it('arrays', function () {
		expect(Array.isArray(new Array)).to.be(true);
		expect(Array.isArray(new Array(10))).to.be(true);
		expect(Array.isArray([])).to.be(true);
		expect(Array.isArray(['a', 'b', 'c'])).to.be(true);
	});
});

describe('returns false with', function () {
	it('empty, null, or undefined', function () {
		expect(Array.isArray()).to.be(false);
		expect(Array.isArray(undefined)).to.be(false);
		expect(Array.isArray(null)).to.be(false);
	});

	it('arguments', function () {
		var args = (function () {
			return arguments;
		})('a', 'b', 'c');

		expect(Array.isArray(args)).to.be(false);
	});

	it('primatives', function () {
		expect(Array.isArray(true)).to.be(false);
		expect(Array.isArray('abc')).to.be(false);
		expect(Array.isArray(123)).to.be(false);
	});

	it('instances', function () {
		expect(Array.isArray(new Date)).to.be(false);
		expect(Array.isArray(new Object)).to.be(false);
		expect(Array.isArray(new Function)).to.be(false);
		expect(Array.isArray(new Number)).to.be(false);
		expect(Array.isArray(new String)).to.be(false);
	});

	it('constructors', function () {
		expect(Array.isArray(Math)).to.be(false);
		expect(Array.isArray(Object)).to.be(false);
		expect(Array.isArray(Number)).to.be(false);
		expect(Array.isArray(String)).to.be(false);
	});

	it('objects', function () {
		expect(Array.isArray({})).to.be(false);
		expect(Array.isArray({
			0: 'a',
			1: 'b',
			2: 'c',
			length: 3
		})).to.be(false);
	});

	it('objects as array subclasses', function () {
		function NotArray() {}

		NotArray.prototype = new Array;

		expect(Array.isArray(new NotArray)).to.be(false);
	});

	it('functions', function () {
		expect(Array.isArray(function () {
			return [];
		})).to.be(false);
	});

	it('regular expressions', function () {
		expect(Array.isArray(/abc/)).to.be(false);
	});
});
