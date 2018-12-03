/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.fill);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.fill, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.fill, 'fill');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'fill');
});

it('fills whole array when using only one argument', function () {
	proclaim.deepEqual([1, 2, 3].fill(0), [0, 0, 0]);
});

function compareArray(a, b) {
  if (b.length !== a.length) {
    return proclaim.fail(a, b, 'proclaim.deepEqualed an array of length ' + b.length + ', received array of length ' + a.length);;
  }

  for (var i = 0; i < a.length; i++) {
    if (b[i] !== a[i]) {
      return proclaim.fail(a[i], b[i], 'proclaim.deepEqualed item in array index ' + i + ' to be ' + b[i] + ', received ' + a[i]);;
    }
  }
  return true;
}


it('fills whole array with undefined if passed no arguments', function () {
	proclaim.equal(compareArray([1, 2, 3].fill(), [undefined, undefined, undefined]), true);
});

it('starts filling from the start index given by second argument', function () {
	proclaim.deepEqual([1, 2, 3, 4, 5, 6].fill(0, 3), [1, 2, 3, 0, 0, 0]);
});

it('can use a negative start index', function () {
	proclaim.deepEqual([1, 2, 3, 4, 5, 6].fill(0, -2), [1, 2, 3, 4, 0, 0]);
});

it('stops filling at the end index given by third argument', function () {
	proclaim.deepEqual([1, 2, 3, 4, 5, 6].fill(0, 0, 2), [0, 0, 3, 4, 5, 6]);
});

it('can use a negative end index', function () {
	proclaim.deepEqual([1, 2, 3, 4, 5, 6].fill(0, 1, -2), [1, 0, 0, 0, 5, 6]);
});

it('does not fill if start index is larger than array', function () {
	proclaim.deepEqual([1, 2, 3].fill(0, 5), [1, 2, 3]);
});

// `this` tests

it('works on array-like objects', function () {
  proclaim.deepEqual([].fill.call({ length: 3 }, 4), {0: 4, 1: 4, 2: 4, length: 3});
});

it('returns the same array', function () {
  var arr = [];
  var result = arr.fill(1);

  proclaim.deepEqual(result, arr);
});

// start parameter tests

it('undefined start coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, undefined), [1, 1]);
});

it('null start coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, null), [1, 1]);
});

it('true start coerced to 1', function () {
  proclaim.deepEqual([0, 0].fill(1, true), [0, 1]);
});

it('false start coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, false), [1, 1]);
});

it('NaN start coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, NaN), [1, 1]);
});

it('string start coerced to integer', function () {
  proclaim.deepEqual([0, 0].fill(1, '1'), [0, 1]);
});

it('float start coerced to integer', function () {
  proclaim.deepEqual([0, 0].fill(1, 1.5), [0, 1]);
});

// end parameter tests

it('undefined end coerced to length of `this`', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, undefined), [1, 1]);
});

it('null end coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, null), [0, 0]);
});

it('true end coerced to 1', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, true), [1, 0]);
});

it('false end coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, false), [0, 0]);
});

it('NaN end coerced to 0', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, NaN), [0, 0]);
});

it('string end coerced to integer', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, '1'), [1, 0]);
});

it('float end coerced to integer', function () {
  proclaim.deepEqual([0, 0].fill(1, 0, 1.5), [1, 0]);
});
