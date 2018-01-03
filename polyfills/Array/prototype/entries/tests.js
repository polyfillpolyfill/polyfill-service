/* eslint-env mocha, browser */
/* global proclaim */
var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
};
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

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

ifSupportsDescriptors('property isn\'t enumerable', function () {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Array.prototype.entries));
});
