/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.reduce);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.reduce, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.reduce, 'reduce');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'reduce');
});

var spycalls = [];

var spy = function() {
	spycalls.push([].slice.call(arguments));
};

beforeEach(function () {
	spycalls = [];
});

it('should pass the correct arguments to the callback', function () {
	[1,2,3].reduce(spy);
	proclaim.equal(spycalls.length, 2);
	proclaim.deepEqual(spycalls[0], [1, 2, 1, [1,2,3]]);
});
it('should start with the right initialValue', function () {
	[1,2,3].reduce(spy, 0);
	proclaim.equal(spycalls.length, 3);
	proclaim.deepEqual(spycalls[0], [0, 1, 0, [1,2,3]]);
});
it('should not affect elements added to the array after it has begun', function () {
	var arr = [1,2,3], i = 0;
	arr.reduce(function (a, b) {
		i++;
		if (i <= 4) {
			arr.push(a + 3);
		}
		return b;
	});
	proclaim.deepEqual(arr, [1,2,3,4,5]);
	proclaim.equal(i, 2);
});
it('should work as expected for empty arrays', function () {
	proclaim.throws(function () {
		[].reduce(spy);
	});
	proclaim.equal(spycalls.length, 0);
});
it('should throw correctly if no callback is given', function () {
	proclaim.throws(function () {
		[1,2,3].reduce();
	});
});
it('should return the expected result', function () {
	proclaim.equal([1,2,3,4,5,6,7].reduce(function (a, b) {
		return String(a || '') + String(b || '');
	}), [1,2,3,4,5,6,7].join(''));
});
it('should return the expected result with a string', function () {
	proclaim.equal(Array.prototype.reduce.call('1234567', function (a, b) {
		return String(a || '') + String(b || '');
	}), [1,2,3,4,5,6,7].join(''));
});
it('should not directly affect the passed array', function () {
	var test = [1,2,3];
	var copy = [1,2,3];
	test.reduce(function (a, b) {
		return a + b;
	});
	proclaim.deepEqual(test, copy);
});
it('should skip non-set values', function () {
	var test = [1,2,3];
	delete test[1];
	var visited = {};
	test.reduce(function (a, b) {
		if (a) { visited[a] = true; }
		if (b) { visited[b] = true; }
		return 0;
	});
	proclaim.deepEqual(visited, { 1: true, 3: true });
});
it('should return an array with length 1', function () {
	proclaim.equal([1,2,3].reduce.length, 1);
});
