/* eslint-env mocha */
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.setPrototypeOf);
});

it('fails on non-object target', function () {
	proclaim.throws(function () {
		Reflect.setPrototypeOf(null, {});
	});
});

it('fails on non-object proto', function () {
	proclaim.throws(function () {
		Reflect.setPrototypeOf({}, 1);
	});
});
