it('has proper length', function() {
	expect(Array.from.length).to.be(1);
});

// avoid getter/setter tests
// it('is not enumerable', function() {
// 	expect(Array.propertyIsEnumerable('from')).to.not.be.ok();
// });

it('requires an array-like object', function() {
	expect(function () { Array.from(); }).to.throwException();

	expect(function () { Array.from(null); }).to.throwException();
});

it('swallows negative lengths', function() {
	expect(Array.from({ length: -1 }).length).to.be(0);
	expect(Array.from({ length: -Infinity }).length).to.be(0);
	expect(Array.from({ length: -0 }).length).to.be(0);
	expect(Array.from({ length: -42}).length).to.be(0);
});

it('works with primitives', function() {
	expect(Array.from(false)).to.eql([]);
	expect(Array.from(true)).to.eql([]);
	expect(Array.from(-Infinity)).to.eql([]);
	expect(Array.from(-0)).to.eql([]);
	expect(Array.from(0)).to.eql([]);
	expect(Array.from(1)).to.eql([]);
	expect(Array.from(Infinity)).to.eql([]);
});

it('works with strings', function() {
	expect(Array.from('')).to.eql([]);
	expect(Array.from('abc')).to.eql(['a', 'b', 'c']);
});

it('works with objects', function() {
	expect(Array.from({})).to.eql([]);
	expect(Array.from({ a: 1 })).to.eql([]);
});

it('works with arrays', function() {
	expect(Array.from([])).to.eql([]);
	expect(Array.from([1, 2, 3])).to.eql([1, 2, 3]);
	expect(Array.from([4, 5, 6])).to.eql([4, 5, 6]);
});

// IE6-8 does not distinguish between dense and sparse arrays
// it('fills holes in arrays', function() {
// 	var
// 	arr1 = [1, 2, 3],
// 	arr2 = [4, , 6];

// 	delete arr1[1];

// 	var
// 	arr1F = Array.from(arr1),
// 	arr2F = Array.from(arr2);

// 	expect(arr1F[0]).to.eql(arr1[0]);
// 	expect(arr1F[1]).to.eql(arr1[1]);
// 	expect(arr1F[2]).to.eql(arr1[2]);

// 	expect(arr2F[0]).to.eql(arr2[0]);
// 	expect(arr2F[1]).to.eql(arr2[1]);
// 	expect(arr2F[2]).to.eql(arr2[2]);
// });

it('includes Object.prototype values when it is polluted', function() {
	function MyObject() {
		this.length = 3;

		this['0'] = 1;
		this['2'] = 3;
	};

	MyObject.prototype = { 1: 42 };

	expect(Array.from(new MyObject())).to.eql([1, 42, 3]);
});

it('works with arraylike objects', function() {
	var
	arrF = Array.from({ length: 1 });

	expect(arrF[0]).to.eql(undefined);

	expect(Array.from({
		0: 'a',
		1: 'b',
		length: 2
	})).to.eql(['a', 'b']);
});

it('throws with an invalid mapping function', function() {
	expect(function () { Array.from([], undefined); }).to.throwException();
	expect(function () { Array.from([], null); }).to.throwException();
	expect(function () { Array.from([], false); }).to.throwException();
	expect(function () { Array.from([], true); }).to.throwException();
	expect(function () { Array.from([], {}); }).to.throwException();
	expect(function () { Array.from([], /a/g); }).to.throwException();
	expect(function () { Array.from([], 'foo'); }).to.throwException();
	expect(function () { Array.from([], 42); }).to.throwException();
});

it('works with a mapping function', function() {
	var original = [1, 2, 3];

	var actual = Array.from(original, function (value, index) {
		expect(value).to.eql(original[index]);
		expect(arguments.length).to.eql(2);

		return value * 2;
	});

	expect(actual).to.eql([2, 4, 6]);

	it('accepts an object thisArg', function() {
		var context = {};

		Array.from(original, function (value, index) {
			expect(this).to.eql(context);
		}, context);
	});

	it('accepts a primitive thisArg', function() {
		Array.from(original, function (value, index) {
			expect(this.valueOf()).to.eql(42);
			expect(Object.prototype.toString.call(this)).to.eql('[object Number]');
		}, 42);
	});

	it('accepts a falsy thisArg', function() {
		Array.from(original, function (value, index) {
			expect(this.valueOf()).to.eql(false);
			expect(Object.prototype.toString.call(this)).to.eql('[object Boolean]');
		}, false);
	});
});

it('works when called from a non-constructor context', function() {
	var from = Array.from;

	expect(Array.from.call(null, { length: 1, 0: 'a' })).to.eql(['a']);
	expect(from({ length: 1, 0: 'a' })).to.eql(['a']);
});

// avoid getter/setter tests
// it('does not call setters for indexes', function() {
// 	var MyType = function () {};
// 	Object.defineProperty(MyType.prototype, '0', {
// 		set: function (x) { throw new Error('setter called: ' + x); }
// 	});
// 	var myInstance = new MyType();
// 	expect(function () { myInstance[0] = 'foo'; }).to.throwException();

// 	var actual = Array.from.call(MyType, { 0: 'abc', length: 1 });
// 	expect(actual).to.eql({ 0: 'abc', length: 1 });
// 	expect(actual).to.be.a(MyType);
// });
