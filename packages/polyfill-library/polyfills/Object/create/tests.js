/* eslint-env mocha, browser */
/* global proclaim */

it("Should create inherited object", function() {
	var parent = { foo: 'bar', obj: {} };
	var child = Object.create(parent);

	proclaim.isTypeOf(child, 'object');
	proclaim.notStrictEqual(parent, child);
	proclaim.equal(child.foo, parent.foo);
	proclaim.equal(child.obj, parent.obj);
});

it("Should create inherited object from a Native Object", function() {
	var parent = document;
	var child = Object.create(parent);

	proclaim.equal(typeof child, 'object');
	proclaim.notStrictEqual(parent, child);
	proclaim.equal(child.window, parent.window);
	proclaim.equal(child.ELEMENT_NODE, parent.ELEMENT_NODE);
});

it("Should throw a TypeError if called with undefined", function() {
	proclaim.throws(function() { Object.create(undefined); }, TypeError);
});

it("Should create an object if called with null", function() {
	proclaim.equal(typeof Object.create(null), 'object');
});

it("Should throw a TypeError if called with a boolean primitive", function() {
	proclaim.throws(function() { Object.create(true); }, TypeError);
});

it("Should throw a TypeError if called with a number primitive", function() {
	proclaim.throws(function() { Object.create(100); }, TypeError);
});

it("Should not throw a TypeError if called with Function objects", function() {
	proclaim.doesNotThrow(function() {
		Object.create(Function);
	});
	proclaim.doesNotThrow(function() {
		Object.create(Function.prototype);
	});
});

it("Should return an instance of Object", function() {
	proclaim.isInstanceOf(Object.create({}), Object);
});

it("Should set the prototype of the passed-in object", function() {
	function Base() {}

	var
	supportsProto = ''.__proto__ === String.prototype,
	b = new Base(),
	bb = Object.create(b);

	proclaim.equal(supportsProto ? bb.__proto__ : bb.constructor.prototype, b);
});
it("Should allow additional properties to be defined", function() {
	function Base() {}

	var
	b = new Base(),
	bb = Object.create(b, {
		x: {
			value: true,
			writable: false
		},
		y: {
			value: "str",
			writable: false
		}
	});

	proclaim.equal(bb.x, true);
	proclaim.equal(bb.y, "str");
	proclaim.equal(b.x, undefined);
	proclaim.equal(b.y, undefined);
});

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.3.5
// https://github.com/tc39/test262/blob/master/test/suite/ch15/15.2/15.2.3/15.2.3.5/15.2.3.5-4-100.js
it("If the second argument is present and not undefined, add own properties to result object as if by calling the standard built-in function Object.defineProperties with arguments returned object and Properties.", function() {
	var newObj = Object.create({}, {
		prop: {
			value: "ownDataProperty"
		}
	});

	var result1 = newObj.hasOwnProperty("prop");

	// Avoid Object.defineProperty's writable test in old IE
	// delete newObj.prop;

	// var result2 = newObj.hasOwnProperty("prop");

	proclaim.equal(result1, true);
	// proclaim.equal(result2, true);
});
