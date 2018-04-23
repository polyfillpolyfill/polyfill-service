/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.entries);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.entries, 0);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.entries, 'entries');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'entries');
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.entries();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: [0, 'val1'],
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.entries();

	iterator.next();
	iterator.next();

	proclaim.deepEqual(iterator.next(), {
		value: undefined,
		done: true
	});
});
