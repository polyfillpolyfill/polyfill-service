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
	} catch (e) { /* this is ES3 */
		return false;
	}
};
var ifSupportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported() ? it : xit;

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

ifSupportsDescriptors('property isn\'t enumerable', function () {
	proclaim.isFalse(Object.prototype.propertyIsEnumerable.call(Array.prototype.keys));
});
