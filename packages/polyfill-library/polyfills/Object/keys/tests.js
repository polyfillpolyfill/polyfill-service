/* eslint-env mocha, browser */
/* global proclaim */

it('has correct instance', function () {
	proclaim.isInstanceOf(Object.keys, Function);
});

it('has correct argument length', function () {
	proclaim.equal(Object.keys.length, 1);
});

it('works with objects', function () {
	proclaim.equal(Object.keys({}).length, 0);

	proclaim.equal(Object.keys({
		foo: true
	}).length, 1);

	proclaim.equal(Object.keys({
		foo: true,
		bar: false
	}).length, 2);
});

it('works with objects containing otherwise non-enumerable keys', function () {
	proclaim.equal(Object.keys({
		toString: function () {}
	}).length, 1);

	proclaim.equal(Object.keys({
		constructor: 0,
		hasOwnProperty: 0,
		isPrototypeOf: 0,
		propertyIsEnumerable: 0,
		toString: 0,
		toLocaleString: 0,
		valueOf: 0
	}).length, 7);
});

it('throws on empty, undefined, or null arguments', function () {
  proclaim.throws(function () {
    Object.keys();
  });
  proclaim.throws(function () {
    Object.keys(null);
  });
  proclaim.throws(function () {
    Object.keys(undefined);
  });
});

it('treats functions as Objects', function () {
  function testFn(a, b, c) {
    a;
    b;
    c;
    return 1;
  }

  testFn.something = 2;
  testFn.somethingElse = 3;

  proclaim.equal(Object.keys(testFn).length, 2);
});

it('treats Arrays and strings as Object with index keys', function () {
  // proclaim.deepEqual(Object.keys([]), [], 'a1');
  // proclaim.deepEqual(Object.keys(['a', 'b', 'c']), ['0', '1', '2'], 'b1');

  // proclaim.deepEqual(Object.keys(''), [], 'c1');
  proclaim.deepEqual(Object.keys('hello'), ['0', '1', '2', '3', '4'], 'd1');
});

it('returns an empty Array for numbers and booleans', function () {
  proclaim.equal(Object.keys(3).length, 0, 'e1');
  proclaim.equal(Object.keys(true).length, 0, 'f1');
  proclaim.equal(Object.keys(false).length, 0, 'g1');
});
