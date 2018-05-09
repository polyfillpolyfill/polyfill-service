/* eslint-env mocha */
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.getPrototypeOf);
});

it('fails on non-object', function () {
	proclaim.throws(function () {
		Reflect.getPrototypeOf(null);
	});
});

it('Returns prototype', function () {
	function O() {
	}

	O.prototype.foo = 'bar';
	var inst = new O();

	proclaim.equal(Object.getPrototypeOf(inst), Reflect.getPrototypeOf(inst));
});
