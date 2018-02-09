/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.parseFloat);
});

it('has correct arity', function () {
	proclaim.arity(Number.parseFloat, 1);
});

it('has correct name', function () {
	proclaim.hasName(Number.parseFloat, 'parseFloat');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Number, 'parseFloat');
});

it('returns NaN with NaN values', function () {
	proclaim.equal(Number.parseFloat('Hello').toString(), NaN.toString());
	proclaim.equal(Number.parseFloat('H546').toString(), NaN.toString());
});

it('returns 15 for valid numbers and non-number data types', function () {
	proclaim.equal(Number.parseFloat(15.45), 15.45);
  proclaim.equal(Number.parseFloat("15"), 15);
  proclaim.equal(Number.parseFloat("150e-1"), 15);
  proclaim.equal(Number.parseFloat("0.150e+2"), 15);
  proclaim.equal(Number.parseFloat("15.1px"), 15.1);
  proclaim.equal(Number.parseFloat("15.2"), 15.2);
});

it('works as expected', function () {
	// TODO: Make this test pass
	// proclaim.equal(Number.parseFloat, parseFloat);
	proclaim.equal(Number.parseFloat('0'), 0);
	proclaim.equal(Number.parseFloat(' 0'), 0);
	proclaim.equal(Number.parseFloat('+0'), 0);
	proclaim.equal(Number.parseFloat(' +0'), 0);
	proclaim.equal(Number.parseFloat('-0'), -0);
	proclaim.equal(Number.parseFloat(' -0'), -0);
	var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
	proclaim.equal(Number.parseFloat(ws + '+0'), 0);
	proclaim.equal(Number.parseFloat(ws + '-0'), -0);
	proclaim.isTrue(isNaN(Number.parseFloat(null)));
	proclaim.isTrue(isNaN(Number.parseFloat(undefined)));
});
