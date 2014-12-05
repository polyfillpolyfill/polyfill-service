it('has correct instance', function () {
	expect(Array.prototype.every).to.be.a(Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	expect(nameOf(Array.prototype.every)).to.be('every');
});

it('has correct argument length', function () {
	expect(Array.prototype.every.length).to.be(1);
});

describe('callback', function () {
	it('has correct argument length', function () {
		[10, 11, 12].every(function () {
			expect(arguments.length).to.be(3);
		});
	});
});

describe('applies callback correctly with', function () {
	function elementIsGreaterThan9(element) {
		return element > 9;
	}

	function elementIsGreaterThan10(element) {
		return element > 10;
	}

	it('arrays', function () {
		expect([10, 11, 12].every(elementIsGreaterThan9)).to.be(true);
		expect([10, 11, 12].every(elementIsGreaterThan10)).to.be(false);
	});

	it('array-like objects', function () {
		var
		// 3: 0 is ignored because length omits it
		object = { 0: 10, 1: 11, 2: 12, 3: 0, length: 3 };

		expect(Array.prototype.every.call(object, elementIsGreaterThan9)).to.be(true);
		expect(Array.prototype.every.call(object, elementIsGreaterThan10)).to.be(false);
	});
});
