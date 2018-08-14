/* eslint-env mocha */

/* globals proclaim, Reflect */

it('is a function', function () {
	proclaim.isFunction(Reflect.deleteProperty);
});

it('returns true on valid target', function () {
	var o = {foo: 'bar'};
	proclaim.isTrue(Reflect.deleteProperty(o, 'foo'), 'not true');
	proclaim.isUndefined(o.foo, 'not undefined');
});

it('returns true on nonexistent prop', function () {
	var o = {};
	proclaim.isTrue(Reflect.deleteProperty(o, 'foo'));
});

it('returns false on non-configurable prop', function() {
	var o = {};
	Object.defineProperty(o, 'foo', {value: 1, configurable: false});
	proclaim.isFalse(Reflect.deleteProperty(o, 'foo'), 'not false');
	proclaim.equal(1, o.foo, 'not equal');
});

it('throws on non-object', function() {
	proclaim.throws(function() {
		Reflect.deleteProperty(null, 'foo');
	})
});
