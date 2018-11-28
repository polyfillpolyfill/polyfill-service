/* eslint-env mocha */
/* globals proclaim, Symbol */

it('is a function', function () {
	proclaim.isFunction(String.prototype[Symbol.iterator]);
});

it('has correct arity', function () {
	proclaim.arity(String.prototype[Symbol.iterator], 0);
});

// TODO: Look into this
// it('has correct name', function () {
// 	proclaim.hasName(String.prototype[Symbol.iterator], '[Symbol.iterator]');
// });

it('is not enumerable', function () {
	proclaim.isNotEnumerable(String.prototype, Symbol.iterator);
});

it('returns a next-able object', function () {
	var str = 'ab';
	var iterator = str[Symbol.iterator]();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: 'a',
		done: false
	});
});

it('finally returns a done object', function () {
	var str = 'ab';
	var iterator = str[Symbol.iterator]();
	iterator.next();
	iterator.next();
	proclaim.deepEqual(iterator.next(), {
		value: undefined,
		done: true
	});
});


