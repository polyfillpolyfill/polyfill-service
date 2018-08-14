/* eslint-env mocha */
/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.get);
});

it('should throw on null', function () {
	proclaim.throws(function () {
		Reflect.get(null, 'a');
	})
});

it('should throw on number', function () {
	proclaim.throws(function () {
		Reflect.get(1, 'a');
	})
});

it('should throw on string', function () {
	proclaim.throws(function () {
		Reflect.get('foo', 'a');
	})
});

it('should return prop if it exists', function () {
	proclaim.equal(1, Reflect.get({a: 1}, 'a'))
});
