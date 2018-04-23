/* eslint-env mocha, browser */
/* global proclaim, Symbol */

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
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

it('has the well known symbol hasInstance as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.hasInstance, undefined);

	if (supportsDescriptors) {
		var hasInstance = Symbol.hasInstance;
		Symbol.hasInstance = "nope";
		proclaim.equal(Symbol.hasInstance, hasInstance);
	}
});
