it('has correct instance', function () {
	expect(Array.prototype.findIndex).to.be.a(Function);
});

it('has correct name', function () {
	expect(nameOf(Array.prototype.findIndex)).to.be('findIndex');
});

it('has correct argument length', function () {
	expect(Array.prototype.findIndex.length).to.be(1);
});

describe('callback', function () {
	it('has correct argument length', function () {
		[0].findIndex(function () {
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
		expect([4, 6, 7, 12].findIndex(isPrime)).to.be(2);
		expect([4, 6, 8, 12].findIndex(isPrime)).to.be(-1);
	});

	it('array-like objects', function () {
		var
		// 4: 13 is not considered as length omits this element
		objectA = { 0: 4, 1: 6, 2: 7, 3: 12, 4: 13, length: 3 },
		objectB = { 0: 4, 1: 6, 2: 8, 3: 12, 4: 13, length: 3 };

		expect(Array.prototype.findIndex.call(objectA, isPrime)).to.be(2);
		expect(Array.prototype.findIndex.call(objectB, isPrime)).to.be(-1);
	});
});
