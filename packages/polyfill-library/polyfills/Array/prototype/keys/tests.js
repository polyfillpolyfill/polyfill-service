/* eslint-env mocha, browser */
/* global proclaim */

it('is named \'keys\'', function () {
	// Don't fail tests just because browser doesn't support the Function.name polyfill
	if ([].keys.name) {
		proclaim.equal([].keys.name, 'keys');
	}
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

it('property isn\'t enumerable', function () {
	var array = ['val1', 'val2'];
	var enumerableLength = 0;

	for (var i in array) { // eslint-disable-line no-unused-vars
		enumerableLength++;
	}

	proclaim.equal(enumerableLength, array.length);
});
