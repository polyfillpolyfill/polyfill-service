/* eslint-env mocha */

/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.has);
});

it('throws on non-object', function () {
	proclaim.throws(function () {
		Reflect.has(null, 'a');
	});
});

it('falses on nonexistent prop', function () {
	proclaim.isFalse(Reflect.has({a: 1}, 'b'));
});

it('trues on existing prop', function () {
	proclaim.isTrue(Reflect.has({a: 1}, 'a'));
});
