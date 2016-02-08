it('has correct instance', function () {
	expect(Array.prototype.fill).to.be.a(Function);
});

it('has correct name', function () {
	function nameOf(fn) {
		return Function.prototype.toString.call(fn).match(/function\s*([^\s]*)\(/)[1];
	}
	expect(nameOf(Array.prototype.fill)).to.be('fill');
});

it('has correct argument length', function () {
	expect(Array.prototype.fill.length).to.be(1);
});

// TODO: Add functionality tests
