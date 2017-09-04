/* eslint-env mocha, browser */
/* global proclaim */

it('has the correct length', function() {
	proclaim.deepEqual(Object.assign.length, 2);
});

it('throws when target is not an object', function() {
	proclaim.throws(function () {
		Object.assign(null);
	}); // TODO: This should be a TypeError

	proclaim.throws(function () {
		Object.assign(undefined);
	}); // TODO: This should be a TypeError
});

it('Object properties are assigned to target in ascending index order', function () {
	proclaim.deepEqual(Object.assign({ foo: 0 }, { bar: 1 }), {
		foo: 0,
		bar: 1
	});
});

it('Ignores null and undefined sources', function () {
	proclaim.deepEqual(Object.assign({ foo: 0 }, null, undefined), { foo: 0 });

	proclaim.deepEqual(Object.assign({ foo: 0 }, null, undefined, { bar: 1 }, null), {
		foo: 0,
		bar: 1
	});
});

it('throws on null or undefined targets', function() {
	proclaim.throws(function () {
		Object.assign(null, {});
	});

	proclaim.throws(function () {
		Object.assign(undefined, {});
	});

	proclaim.throws(function () {
		Object.assign(undefined, undefined);
	});
});

it('supports multiple sources, overriding previous copies of the same property', function() {
	proclaim.deepEqual(Object.assign({foo: 0}, {bar: 1}, {bar: 2}), {
		foo: 0,
		bar: 2
	});
});

it('does not iterate prototype properties', function() {
	const Bar = function () {};
	Bar.prototype.foo = 2;
	const bar = new Bar();
	bar.baz = 1;

	proclaim.deepEqual(Object.assign({foo: 1}, bar), {
		foo: 1,
		baz: 1
	});
});

it('returns the target object', function() {
	const target = {};
	const returned = Object.assign(target, {foo: 1});
	proclaim.deepEqual(returned, target);
});

it('support `Object.create(null)` objects', function() {
	const obj = Object.create(null);
	obj.foo = true;
	proclaim.deepEqual(Object.assign({}, obj), {foo: true});
});

it('converts primitives as the target into Objects', function() {
	const target = Object.assign(true, {foo: 'bar'});
	const booleanObject = Object(true);
	booleanObject.foo = 'bar';
	proclaim.deepEqual(target, booleanObject);
});
