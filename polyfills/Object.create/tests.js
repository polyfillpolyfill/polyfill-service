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
	function base() {}
	var b = new base();
	var prop = new Object();
	var d = Object.create(b, {
		"x": { value: true, writable: false },
		"y": { value: "str", writable: false }
	});

	expect(Object.getPrototypeOf(d)).to.be(b);
	expect(d.x).to.be(true);
	expect(d.y).to.be("str");
	expect(b.x).to.be(undefined);
	expect(b.y).to.be(undefined);
});
