it('exists', function () {
	expect(Array.prototype).to.have.property('fill');
});

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

it('is not enumerable', function () {
	expect(Array.prototype.propertyIsEnumerable('fill')).to.be.false;
});

it('fills whole array when using only one argument', function () {
	expect([1, 2, 3].fill(0)).to.eql([0, 0, 0]);
});

it('starts filling from the start index given by second argument', function () {
	expect([1, 2, 3, 4, 5, 6].fill(0, 3)).to.eql([1, 2, 3, 0, 0, 0]);
});

it('can use a negative start index', function () {
	expect([1, 2, 3, 4, 5, 6].fill(0, -2)).to.eql([1, 2, 3, 4, 0, 0]);
});

it('stops filling at the end index given by third argument', function () {
	expect([1, 2, 3, 4, 5, 6].fill(0, 0, 2)).to.eql([0, 0, 3, 4, 5, 6]);
});

it('can use a negative end index', function () {
	expect([1, 2, 3, 4, 5, 6].fill(0, 1, -2)).to.eql([1, 0, 0, 0, 5, 6]);
});

it('does not fill if start index is larger than array', function () {
	expect([1, 2, 3].fill(0, 5)).to.eql([1, 2, 3]);
});

it('does fill if start index is not a number', function () {
	expect([1, 2, 3].fill(0, NaN)).to.eql([0, 0, 0]);
	expect([1, 2, 3].fill(1, '')).to.eql([1, 1, 1]);
	expect([1, 2, 3].fill(2, {})).to.eql([2, 2, 2]);
});

it('does not fill if end index is not a number', function () {
	expect([1, 2, 3].fill(0, 0, NaN)).to.eql([1, 2, 3]);
	expect([1, 2, 3].fill(1, 0, '')).to.eql([1, 2, 3]);
	expect([1, 2, 3].fill(2, 0, {})).to.eql([1, 2, 3]);
});

it('works on array-like objects', function () {
  expect([].fill.call({ length: 3 }, 4)).to.eql({0: 4, 1: 4, 2: 4, length: 3});
});
