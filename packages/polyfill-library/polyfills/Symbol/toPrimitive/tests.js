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

it('has the well known symbol toPrimitive as static properties on Symbol', function() {
	proclaim.notEqual(Symbol.toPrimitive, undefined);

	if (supportsDescriptors) {
		var toPrimitive = Symbol.toPrimitive;
		Symbol.toPrimitive = "nope";
		proclaim.equal(Symbol.toPrimitive, toPrimitive);
	}
});
