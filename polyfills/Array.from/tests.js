it('has proper length', function() {
	Array.from.length.should.eql(1);
});

it('is not enumerable', function() {
	Array.propertyIsEnumerable('from').should.not.be.ok;
});

it('requires an array-like object', function() {
	(function () { Array.from(); }).should.throw(TypeError);
	(function () { Array.from(null); }).should.throw(TypeError);
});

it('throws with invalid lengths', function() {
	(function () { Array.from({ length: Infinity }); }).should.throw(RangeError);
	(function () { Array.from({ length: Math.pow(2, 32) }); }).should.throw(RangeError);
});

it('swallows negative lengths', function() {
	Array.from({ length: -1 }).length.should.eql(0);
	Array.from({ length: -Infinity }).length.should.eql(0);
	Array.from({ length: -0 }).length.should.eql(0);
	Array.from({ length: -42}).length.should.eql(0);
});

it('works with primitives', function() {
	Array.from(false).should.eql([]);
	Array.from(true).should.eql([]);
	Array.from(-Infinity).should.eql([]);
	Array.from(-0).should.eql([]);
	Array.from(0).should.eql([]);
	Array.from(1).should.eql([]);
	Array.from(Infinity).should.eql([]);
});

it('works with strings', function() {
	Array.from('').should.eql([]);
	Array.from('abc').should.eql('abc'.split(''));
});

it('works with objects', function() {
	Array.from({}).should.eql([]);
	Array.from({ a: 1 }).should.eql([]);
});

it('works with arrays', function() {
	Array.from([]).should.eql([]);
	Array.from([1, 2, 3]).should.eql([1, 2, 3]);
	Array.from([4, 5, 6]).should.eql([4, 5, 6]);
});

it('fills holes in arrays', function() {
	var arr = [1, 2, 3];
	delete arr[1];
	Array.from(arr).should.eql([1, undefined, 3]);
	Array.from([4, , 6]).should.eql([4, undefined, 6]);
});

it('includes Object.prototype values when it is polluted', function() {
	Object.prototype[1] = 42;
	Array.from({ length: 3, 0: 1, 2: 3 }).should.eql([1, 42, 3]);
	delete Object.prototype[1];
});

it('works with arraylike objects', function() {
	Array.from({ length: 1 }).should.eql([void 0]);
	Array.from({ 0: 'a', 1: 'b', length: 2 }).should.eql(['a', 'b']);
});

it('throws with an invalid mapping function', function() {
	(function () { Array.from([], undefined); }).should.throw(TypeError);
	(function () { Array.from([], null); }).should.throw(TypeError);
	(function () { Array.from([], false); }).should.throw(TypeError);
	(function () { Array.from([], true); }).should.throw(TypeError);
	(function () { Array.from([], {}); }).should.throw(TypeError);
	(function () { Array.from([], /a/g); }).should.throw(TypeError);
	(function () { Array.from([], 'foo'); }).should.throw(TypeError);
	(function () { Array.from([], 42); }).should.throw(TypeError);
});

it('works with a mapping function', function() {
	var original = [1, 2, 3];
	var actual = Array.from(original, function (value, index) {
		value.should.eql(original[index], 'value and index are correct');
		arguments.length.should.eql(2, 'value and index are only arguments passed to the mapping function');
		return value * 2;
	});
	actual.should.eql([2, 4, 6]);

	it('accepts an object thisArg', function() {
		var context = {};
		Array.from(original, function (value, index) {
			this.should.eql(context, 'given context is the actual context');
		}, context);
	});

	it('accepts a primitive thisArg', function() {
		Array.from(original, function (value, index) {
			this.valueOf().should.eql(42, 'context valueOf() is correct');
			Object.prototype.toString.call(this).should.eql('[object Number]', 'context "[[Class]]" is correct');
		}, 42);
	});

	it('accepts a falsy thisArg', function() {
		Array.from(original, function (value, index) {
			this.valueOf().should.eql(false, 'context valueOf() is correct');
			Object.prototype.toString.call(this).should.eql('[object Boolean]', 'context "[[Class]]" is correct');
		}, false);
	});
});

it('works when called from a non-constructor context', function() {
	var from = Array.from;
	Array.from.call(null, { length: 1, 0: 'a' }).should.eql(['a']);
	from({ length: 1, 0: 'a' }).should.eql(['a']);
});

it('does not call setters for indexes', function() {
	var MyType = function () {};
	Object.defineProperty(MyType.prototype, '0', {
		set: function (x) { throw new Error('setter called: ' + x); }
	});
	var myInstance = new MyType();
	(function () { myInstance[0] = 'foo'; }).should.throw();

	var actual = Array.from.call(MyType, { 0: 'abc', length: 1 });
	actual.should.eql({ 0: 'abc', length: 1 });
	actual.should.be.an.instanceOf(MyType);
});

/*
it('should fail this one', function() {
	true.should.be.false;
})
*/
