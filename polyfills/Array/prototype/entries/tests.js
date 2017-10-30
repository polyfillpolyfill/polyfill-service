/* eslint-env mocha, browser */
/* global proclaim */

it('is named \'entries\'', function () {
	// Don't fail tests just because browser doesn't support the Function.name polyfill
	if ([].entries.name) {
		proclaim.equal([].entries.name, 'entries');
	}
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

it('property isn\'t enumerable', function () {
	var array = ['val1', 'val2'];
	var enumerableLength = 0;

	for (var i in array) { // eslint-disable-line no-unused-vars
		enumerableLength++;
	}

	proclaim.equal(enumerableLength, array.length);
});
