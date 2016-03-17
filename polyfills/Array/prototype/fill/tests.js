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

it('fills whole array when using only one argument', function () {
	expect([1, 2, 3].fill(0)).to.eql([0, 0, 0]);
});

function compareArray(a, b) {
  if (b.length !== a.length) {
    return expect().fail('expected an array of length ' + b.length + ', received array of length ' + a.length);
  }

  for (var i = 0; i < a.length; i++) {
    if (b[i] !== a[i]) {
      return expect().fail('expected item in array index ' + i + ' to be ' + b[i] + ', received ' + a[i]);
    }
  }
  return true;
}


it('fills whole array with undefined if passed no arguments', function () {
	expect(compareArray([1, 2, 3].fill(), [undefined, undefined, undefined])).to.eql(true);
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

// `this` tests

it('works on array-like objects', function () {
  expect([].fill.call({ length: 3 }, 4)).to.eql({0: 4, 1: 4, 2: 4, length: 3});
});

it('returns the same array', function() {
  var arr = [];
  var result = arr.fill(1);

  expect(result).to.equal(arr);
});

// start parameter tests

it('undefined start coerced to 0', function() {
  expect([0, 0].fill(1, undefined)).to.eql([1, 1])
});

it('null start coerced to 0', function() {
  expect([0, 0].fill(1, null)).to.eql([1, 1])
});

it('true start coerced to 1', function() {
  expect([0, 0].fill(1, true)).to.eql([0, 1])
});

it('false start coerced to 0', function() {
  expect([0, 0].fill(1, false)).to.eql([1, 1])
});

it('NaN start coerced to 0', function() {
  expect([0, 0].fill(1, NaN)).to.eql([1, 1])
});

it('string start coerced to integer', function() {
  expect([0, 0].fill(1, '1')).to.eql([0, 1])
});

it('float start coerced to integer', function() {
  expect([0, 0].fill(1, 1.5)).to.eql([0, 1])
});

// end parameter tests

it('undefined end coerced to length of `this`', function() {
  expect([0, 0].fill(1, 0, undefined)).to.eql([1, 1])
});

it('null end coerced to 0', function() {
  expect([0, 0].fill(1, 0, null)).to.eql([0, 0])
});

it('true end coerced to 1', function() {
  expect([0, 0].fill(1, 0, true)).to.eql([1, 0])
});

it('false end coerced to 0', function() {
  expect([0, 0].fill(1, 0, false)).to.eql([0, 0])
});

it('NaN end coerced to 0', function() {
  expect([0, 0].fill(1, 0, NaN)).to.eql([0, 0])
});

it('string end coerced to integer', function() {
  expect([0, 0].fill(1, 0, '1')).to.eql([1, 0])
});

it('float end coerced to integer', function() {
  expect([0, 0].fill(1, 0, 1.5)).to.eql([1, 0])
});
