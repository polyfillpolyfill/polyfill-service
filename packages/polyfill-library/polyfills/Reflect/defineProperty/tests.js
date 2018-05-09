/* eslint-env mocha */

/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.defineProperty);
});

it('returns true on valid target', function () {
	proclaim.isTrue(Reflect.defineProperty({}, 'foo', {value: 1}));
});

it('returns false on invalid target', function () {
	proclaim.isFalse(Reflect.defineProperty(null, 'foo', {value: 1}));
});
