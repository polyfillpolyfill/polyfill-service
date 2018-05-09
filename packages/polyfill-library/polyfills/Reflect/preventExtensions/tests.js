/* eslint-env mocha */

/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.preventExtensions);
});

it('throws on non-object', function () {
	proclaim.throws(function () {
		Reflect.preventExtensions(null);
	});
});
