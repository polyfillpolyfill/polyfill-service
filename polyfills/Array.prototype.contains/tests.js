it('has correct instance', function () {
	expect(Array.prototype.contains).to.be.a(Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	expect(nameOf(Array.prototype.contains)).to.be('contains');
});

it('has correct argument length', function () {
	expect(Array.prototype.contains.length).to.be(1);
});

it('handles arrays', function () {
	expect([10, 11, 12, 13].contains(12)).to.be(true);
	expect([10, 11, 12, 13].contains(14)).to.be(false);
	expect([10, 11, 12, 13].contains(13, 4)).to.be(false);
	expect([10, 11, 12, 13].contains(13, -1)).to.be(true);
});

it('handles arrays using SameValueZero equality algorithm', function () {
	expect([-0, 11, 12, 13].contains(+0)).to.be(true);
	expect([+0, 11, 12, 13].contains(-0)).to.be(true);
	expect([NaN, 11, 12, 13].contains(NaN)).to.be(true);
});

it('handles array-like objects', function () {
	var
	// 3: 0 is ignored because length omits it
	object = { 0: NaN, 1: 11, 2: 12, 3: 13, length: 3 };

	expect(Array.prototype.contains.call(object, 12)).to.be(true);
	expect(Array.prototype.contains.call(object, 13)).to.be(false);
	expect(Array.prototype.contains.call(object, 13, 3)).to.be(false);
	expect(Array.prototype.contains.call(object, 12, -1)).to.be(true);
	expect(Array.prototype.contains.call(object, NaN)).to.be(true);
});

it('handles array-like objects with out-of-range lengths', function () {
	var
	object = { 0: 10, 1: 11, 2: 12, 3: 13, length: -Infinity };

	expect(Array.prototype.contains.call(object, 10)).to.be(false);
	expect(Array.prototype.contains.call(object, 10)).to.be(false);
});
