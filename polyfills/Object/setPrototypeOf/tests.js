/* eslint-env mocha, browser */
/* global proclaim */

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

it('changes prototype to regular complex objects, with mutation', function() {
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
