/* eslint-env mocha */
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.set);
});

it('Throws on non-object', function () {
	proclaim.throws(function () {
		Reflect.set(null, 'foo', 'bar');
	});
});

it('Returns true on set prop', function () {
	var o = {};
	proclaim.isTrue(Reflect.set(o, 'a', 1), 'not true');
	proclaim.equal(o.a, 1, 'not equal');
});

it('Returns false on failure', function () {
	var o = {};
	Object.defineProperty(o, 'a', {value: 1, writable: false, configurable: false});

	proclaim.isFalse(Reflect.set(o, 'a', 1));
});
