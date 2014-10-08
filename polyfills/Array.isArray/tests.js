it('is a function', function() {
	expect(Array.isArray).to.be.a('function')
});

it('takes 1 argument', function() {
	expect(Array.isArray.length).to.be(1)
});

it('returns true if arg is an array', function() {
	expect(Array.isArray([])).to.be(true);

});

it('returns false if arg is not an array (literals)', function() {
	expect(Array.isArray(42)).to.be(false);
	expect(Array.isArray(undefined)).to.be(false);
	expect(Array.isArray(true)).to.be(false);
	expect(Array.isArray("abc")).to.be(false);
	expect(Array.isArray({})).to.be(false);
	expect(Array.isArray(null)).to.be(false);
});

it('returns true if arg is an array constructed from Array constuctor', function() {
	var a = new Array(10);
	expect(Array.isArray(a)).to.be(true);
});

it('returns false if arg is an instantiated built-in object', function() {
	var o = new Object();
	o[12] = 13;
	expect(Array.isArray(o)).to.be(false);
	var n = new Number(23);
	expect(Array.isArray(n)).to.be(false);
	var s = new String('[]');
	expect(Array.isArray(s)).to.be(false);
	var f = function() {};
	expect(Array.isArray(f)).to.be(false);
	var d = new Date();
	expect(Array.isArray(d)).to.be(false);
	var r = new RegExp();
	expect(Array.isArray(r)).to.be(false);
});

it('returns false if arg is a built in object', function() {
	expect(Array.isArray(Math)).to.be(false);
	expect(Array.isArray(Object)).to.be(false);
	expect(Array.isArray(Number)).to.be(false);
	expect(Array.isArray(String)).to.be(false);
});

it('returns false for an object with an array as the prototype', function() {
	var proto = [];
	var Fake = function() {};
	Fake.prototype = proto;
	var inst = new Fake();
	expect(Array.isArray(inst)).to.be(false);
});

it('returns false for an array-like object', function() {
	expect(Array.isArray({0:12, 1:9, length:2})).to.be(false);
});

it('returns false for the arguments keyword', function() {
	var arg;
	(function fun() {
		arg = arguments;
	}(1, 2, 3));
	expect(Array.isArray(arg)).to.be(false);
})
