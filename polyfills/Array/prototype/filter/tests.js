/* eslint-env mocha, browser */
/* global proclaim */

var stringsOnly = function(val) {
	return (typeof val === 'string');
};

it('is a function', function() {
	proclaim.isInstanceOf(Array.prototype.filter, Function);
});

it('takes 1 argument', function() {
	proclaim.equal(Array.prototype.filter.length, 1);
});

it('throws a TypeError when applied to non-array-like types', function() {
	proclaim.throws(function() {
		Array.prototype.filter.call(undefined);
	}, TypeError);
	proclaim.throws(function() {
		Array.prototype.filter.call(null);
	}, TypeError);
});

it('correctly filters an array', function() {
	proclaim.deepEqual(Array.prototype.filter.call(['foo', 'bar'], stringsOnly), ['foo','bar']);
	proclaim.deepEqual(Array.prototype.filter.call([7, 'foo', 42, 'bar'], stringsOnly), ['foo','bar']);
	proclaim.deepEqual(Array.prototype.filter.call([42,43,44], stringsOnly), []);
});
