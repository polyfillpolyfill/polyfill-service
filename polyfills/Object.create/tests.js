function assertTypeError(e) {
	expect(e).to.be.a(TypeError);
}

it("Should create inherited object", function() {
	var parent = { foo: 'bar', obj: {} };
	var child = Object.create(parent);

	expect(typeof child).to.be('object');
	expect(parent).to.not.be(child);
	expect(child.foo).to.be(parent.foo);
	expect(child.obj).to.be(parent.obj);
});

it("Should throw a TypeError if called with undefined", function() {
	expect(function() { Object.create(undefined); }).to.throwException(assertTypeError);
});

it("Should create an object if called with null", function() {
	expect(typeof Object.create(null)).to.be('object');
});

it("Should throw a TypeError if called with a boolean primitive", function() {
	expect(function() { Object.create(true); }).to.throwException(assertTypeError);
});

it("Should throw a TypeError if called with a number primitive", function() {
	expect(function() { Object.create(100); }).to.throwException(assertTypeError);
});

it("Should return an instance of Object", function() {
	expect(Object.create({})).to.be.an(Object);
});

it("Should set the prototype of the passed-in object and add new properties", function() {
	function Base() {}

	var
	supportsProto = ''.__proto__ === String.prototype,
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

	expect(supportsProto ? bb.__proto__ : bb.constructor.prototype).to.be(b);
	expect(bb.x).to.be(true);
	expect(bb.y).to.be("str");
	expect(b.x).to.be(undefined);
	expect(b.y).to.be(undefined);
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

	expect(result1).to.be(true);
	// expect(result2).to.be(true);
});
