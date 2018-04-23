/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.keys);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.keys, 0);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.keys, 'keys');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'keys');
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.keys();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: 0,
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.keys();

	iterator.next();
	iterator.next();

	proclaim.deepEqual(iterator.next(), {
		value: undefined,
		done: true
	});
});
