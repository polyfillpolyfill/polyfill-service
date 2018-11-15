/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.keys);
});

it('has correct arity', function () {
	proclaim.arity(Object.keys, 1);
});

it('has correct name', function () {
	proclaim.hasName(Object.keys, 'keys');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Object, 'keys');
});

it('works as expected', function () {
	var toString$ = {}.toString;
    var fn1, fn2, i$, ref$, len$, value;
    fn1 = function(w){
      this.w = w != null ? w : 2;
    };
    fn2 = function(toString){
      this.toString = toString != null ? toString : 2;
    };
    fn1.prototype.q = fn2.prototype.q = 1;
    proclaim.deepEqual(Object.keys([1, 2, 3]), ['0', '1', '2']);
    proclaim.deepEqual(Object.keys(new fn1(1)), ['w']);
    proclaim.deepEqual(Object.keys(new fn2(1)), ['toString']);
    proclaim.ok(!in$('push', Object.keys(Array.prototype)));
    for (i$ = 0, len$ = (ref$ = [42, 'foo', false]).length; i$ < len$; ++i$) {
      value = ref$[i$];
      proclaim.ok((fn$()), "accept " + toString$.call(value).slice(8, -1));
    }
    for (i$ = 0, len$ = (ref$ = [null, void 8]).length; i$ < len$; ++i$) {
      value = ref$[i$];
      proclaim.throws(fn1$, TypeError, "throws on " + value);
    }
    function fn$(){
      try {
        Object.keys(value);
        return true;
      } catch (e$) {}
    }
    function fn1$(){
      Object.keys(value);
    }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
});

it('works with objects', function () {
	proclaim.equal(Object.keys({}).length, 0);

	proclaim.equal(Object.keys({
		foo: true
	}).length, 1);

	proclaim.equal(Object.keys({
		foo: true,
		bar: false
	}).length, 2);
});

it('works with objects containing otherwise non-enumerable keys', function () {
	proclaim.equal(Object.keys({
		toString: function () {}
	}).length, 1);

	proclaim.equal(Object.keys({
		constructor: 0,
		hasOwnProperty: 0,
		isPrototypeOf: 0,
		propertyIsEnumerable: 0,
		toString: 0,
		toLocaleString: 0,
		valueOf: 0
	}).length, 7);
});

it('throws on empty, undefined, or null arguments', function () {
  proclaim.throws(function () {
    Object.keys();
  });
  proclaim.throws(function () {
    Object.keys(null);
  });
  proclaim.throws(function () {
    Object.keys(undefined);
  });
});

it('treats functions as Objects', function () {
  function testFn(a, b, c) {
    a;
    b;
    c;
    return 1;
  }

  testFn.something = 2;
  testFn.somethingElse = 3;

  proclaim.equal(Object.keys(testFn).length, 2);
});

it('treats Arrays and strings as Object with index keys', function () {
  // proclaim.deepEqual(Object.keys([]), [], 'a1');
  // proclaim.deepEqual(Object.keys(['a', 'b', 'c']), ['0', '1', '2'], 'b1');

  // proclaim.deepEqual(Object.keys(''), [], 'c1');
  proclaim.deepEqual(Object.keys('hello'), ['0', '1', '2', '3', '4'], 'd1');
});

it('returns an empty Array for numbers and booleans', function () {
  proclaim.equal(Object.keys(3).length, 0, 'e1');
  proclaim.equal(Object.keys(true).length, 0, 'f1');
  proclaim.equal(Object.keys(false).length, 0, 'g1');
});
