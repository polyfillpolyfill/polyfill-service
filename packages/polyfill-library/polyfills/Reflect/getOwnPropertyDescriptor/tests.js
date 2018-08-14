/* eslint-env mocha */
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.getOwnPropertyDescriptor);
});

it('fails on non-object', function () {
	proclaim.throws(function () {
		Reflect.getOwnPropertyDescriptor(null, '');
	});
});

it('returns descriptor', function () {
	var o = {};
	Object.defineProperty(o, 'foo', {value: 'bar'});
	var desc = Reflect.getOwnPropertyDescriptor(o, 'foo');

	proclaim.equal(desc.value, 'bar');
});
