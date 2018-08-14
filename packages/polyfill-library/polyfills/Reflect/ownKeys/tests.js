/* eslint-env mocha */

/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.ownKeys);
});

it('throws on non-object', function () {
	proclaim.throws(function () {
		Reflect.ownKeys(null);
	});
});

it('returns keys', function () {
	var o = {a: 1, b: 2};
	var res = Reflect.ownKeys(o);

	var k1 = res[0];

	proclaim.isTrue(k1 === 'a' || k1 === 'b', 'first');
	proclaim.isTrue(k1 === 'a' ? 'b' : 'a', 'second')
});
