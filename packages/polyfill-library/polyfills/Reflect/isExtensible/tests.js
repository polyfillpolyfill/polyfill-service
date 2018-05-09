/* eslint-env mocha */

/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.isExtensible);
});

it('throws on non-object', function () {
	proclaim.throws(function () {
		Reflect.isExtensible(null);
	});
});
