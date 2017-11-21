/* eslint-env mocha, browser */
/* global proclaim */

it('changes prototype to regular objects', function() {
	var obj = {a: 123};
	proclaim.equal(obj instanceof Object, true);
	// sham requires assignment to work cross browser
	obj = Object.setPrototypeOf(obj, null);
	proclaim.equal(obj instanceof Object, false);
	proclaim.equal(obj.a, 123);
});

it('changes prototype to null objects', function() {
	var obj = Object.create(null);
	obj.a = 456;
	proclaim.equal(obj instanceof Object, false);
	proclaim.equal(obj.a, 456);
	// sham requires assignment to work cross browser
	obj = Object.setPrototypeOf(obj, {});
	proclaim.equal(obj instanceof Object, true);
	proclaim.equal(obj.a, 456);
});
