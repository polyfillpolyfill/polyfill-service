it('has correct instance', function () {
	expect(Number.isNaN).to.be.a(Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	expect(nameOf(Number.isNaN)).to.be('isNaN');
});

it('has correct argument length', function () {
	expect(Number.isNaN.length).to.be(1);
});

describe('returns true with', function () {
	it('numbers', function () {
		expect(Number.isNaN(NaN)).to.be(true);
	});
});