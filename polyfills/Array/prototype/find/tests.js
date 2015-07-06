it('has correct instance', function () {
	expect(Array.prototype.find).to.be.a(Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	expect(nameOf(Array.prototype.find)).to.be('find');
});

it('has correct argument length', function () {
	expect(Array.prototype.find.length).to.be(1);
});

describe('callback', function () {
	it('has correct argument length', function () {
		[0].find(function () {
			expect(arguments.length).to.be(3);
		});
	});
});

describe('applies callback correctly with', function () {
	function isPrime(element) {
		var start = 1;

		while (++start <= Math.sqrt(element)) {
			if (element % start < 1) {
				return false;
			}
		}

		return element > 1;
	}

	it('arrays', function () {
		expect([4, 6, 7, 12].find(isPrime)).to.be(7);
		expect([4, 6, 8, 12].find(isPrime)).to.be(undefined);
	});

	it('array-like objects', function () {
		var
		// 4: 13 is ignored because length omits it
		objectA = { 0: 4, 1: 6, 2: 7, 3: 12, 4: 13, length: 4 },
		objectB = { 0: 4, 1: 6, 2: 8, 3: 12, 4: 13, length: 4 };

		expect(Array.prototype.find.call(objectA, isPrime)).to.be(7);
		expect(Array.prototype.find.call(objectB, isPrime)).to.be(undefined);
	});
});
