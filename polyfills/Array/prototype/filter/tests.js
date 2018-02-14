/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.filter);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.filter, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.filter, 'filter');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'filter');
});

var stringsOnly = function(val) {
	return (typeof val === 'string');
};

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
