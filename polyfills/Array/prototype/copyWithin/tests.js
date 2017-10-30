/* eslint-env mocha, browser*/
/* global proclaim, it */

// Tests based on https://github.com/es-shims/es6-shim/blob/master/test/array.js#L331-L418
it('is a function', function () {
	proclaim.isFunction(Array.prototype.copyWithin);
});

it('has correct argument length', function () {
	proclaim.strictEqual(Array.prototype.copyWithin.length, 2);
});

it('modifies the object in-place', function () {
	var arr = [1, 2, 3, 4, 5];
	proclaim.deepStrictEqual(arr.copyWithin(0, 3), [4, 5, 3, 4, 5]);
	proclaim.deepStrictEqual(arr, [4, 5, 3, 4, 5]);
});

it('works with 2 args', function () {
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(0, 3), [4, 5, 3, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(1, 3), [1, 4, 5, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(1, 2), [1, 3, 4, 5, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(2, 2), [1, 2, 3, 4, 5]);
});

it('works with 3 args', function () {
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(0, 3, 4), [4, 2, 3, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(1, 3, 4), [1, 4, 3, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(1, 2, 4), [1, 3, 4, 4, 5]);
});

it('works with negative args', function () {
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(0, -2), [4, 5, 3, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(0, -2, -1), [4, 2, 3, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -2), [1, 3, 3, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(-4, -3, -1), [1, 3, 4, 4, 5]);
	proclaim.deepStrictEqual([1, 2, 3, 4, 5].copyWithin(-4, -3), [1, 3, 4, 5, 5]);
});

it('works with arraylike objects', function () {
	var args = (function () { return arguments; }(1, 2, 3));
	var argsClass = Object.prototype.toString.call(args);
	proclaim.deepStrictEqual(Array.prototype.slice.call(args), [1, 2, 3]);
	Array.prototype.copyWithin.call(args, -2, 0);
	proclaim.deepStrictEqual(Array.prototype.slice.call(args), [1, 1, 2]);
	proclaim.strictEqual(Object.prototype.toString.call(args), argsClass);
});

it('should delete the target key if the source key is not present', function () {
	proclaim.deepStrictEqual([, 1, 2].copyWithin(1, 0), [, , 1]);
});

it('should check inherited properties as well', function () {
	var Parent = function Parent() {};
	Parent.prototype[0] = 'foo';
	var sparse = new Parent();
	sparse[1] = 1;
	sparse[2] = 2;
	sparse.length = 3;
	var result = Array.prototype.copyWithin.call(sparse, 1, 0);
	proclaim.ok(result['0']);
	proclaim.notOk(Object.prototype.hasOwnProperty.call(result, '0'));
	proclaim.isTrue(Object.prototype.hasOwnProperty.call(result, '1'));
	proclaim.deepEqual(result[0], 'foo');
	proclaim.deepEqual(result[1], 'foo');
	proclaim.deepEqual(result[2], 1);
	proclaim.deepEqual(result.length, 3 );
});
