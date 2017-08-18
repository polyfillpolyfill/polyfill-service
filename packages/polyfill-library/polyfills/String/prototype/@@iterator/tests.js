/* eslint-env mocha */
/* global proclaim */

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


