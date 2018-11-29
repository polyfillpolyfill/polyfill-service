/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.setPrototypeOf);
});

it('has correct arity', function () {
	proclaim.arity(Object.setPrototypeOf, 2);
});

it('has correct name', function () {
	proclaim.hasName(Object.setPrototypeOf, 'setPrototypeOf');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'setPrototypeOf');
});


it('changes prototype to null objects', function() {
	var obj = {a: 123};
	proclaim.equal(obj instanceof Object, true);
	// sham requires assignment to work cross browser
	obj = Object.setPrototypeOf(obj, null);
	proclaim.equal(obj instanceof Object, false);
	proclaim.equal(obj.a, 123);
});

it('changes prototype to regular simple objects', function() {
	var obj = Object.create(null);
	obj.a = 456;
	proclaim.equal(obj instanceof Object, false);
	proclaim.equal(obj.a, 456);
	// sham requires assignment to work cross browser
	obj = Object.setPrototypeOf(obj, {});
	proclaim.equal(obj instanceof Object, true);
	proclaim.equal(obj.a, 456);
});

// Our polyfill requires reassignment of the same object, meaning external, non own objects, might not be upgraded if the engine was not compatible.
// https://github.com/paulmillr/es6-shim/pull/281#issue-39995975
it.skip('changes prototype to regular complex objects, with mutation', function() {
	var Child = function () {};
	var Parent = {a: 123};
	var child = new Child();
	Object.setPrototypeOf(child, Parent);
	proclaim.equal(child.a, 123);
});


it('changes prototype to regular complex objects, with return', function() {
	var Child = function () {};
	var Parent = {a: 123};
	var child = new Child();
	child = Object.setPrototypeOf(child, Parent);
	proclaim.equal(child.a, 123);
});
