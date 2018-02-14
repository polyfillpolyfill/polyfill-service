/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.reduceRight);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.reduceRight, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.reduceRight, 'reduceRight');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'reduceRight');
});

var spycalls = [];

var spy = function() {
	spycalls.push([].slice.call(arguments));
};

beforeEach(function () {
	spycalls = [];
});

it('should pass the correct arguments to the callback', function () {
	[1,2,3].reduceRight(spy);
	proclaim.equal(spycalls.length, 2);
	proclaim.deepEqual(spycalls[0], [3, 2, 1, [1,2,3]]);
});
it('should start with the right initialValue', function () {
	[1,2,3].reduceRight(spy, 0);
	proclaim.equal(spycalls.length, 3);
	proclaim.deepEqual(spycalls[0], [0, 3, 2, [1,2,3]]);
});
it('should not affect elements added to the array after it has begun', function () {
	var arr = [1,2,3], i = 0;
	arr.reduceRight(function (a, b) {
		i++;
		if (i <= 4) {
			arr.push(a + 3);
		}
		return b;
	});
	proclaim.deepEqual(arr, [1,2,3,6,5]);
	proclaim.equal(i, 2);
});
it('should work as expected for empty arrays', function () {
	proclaim.throws(function () {
		[].reduceRight(spy);
	});
	proclaim.equal(spycalls.length, 0);
});
it('should throw correctly if no callback is given', function () {
	proclaim.throws(function () {
		[1,2,3].reduceRight();
	});
});
it('should return the expected result', function () {
	proclaim.deepEqual([1,2,3,4,5,6,7].reduceRight(function (a, b) {
		return String(a || '') + String(b || '');
	}), [7,6,5,4,3,2,1].join(''));
});
it('should return the expected result with a string', function () {
	proclaim.deepEqual(Array.prototype.reduceRight.call('1234567', function (a, b) {
		return String(a || '') + String(b || '');
	}), [7,6,5,4,3,2,1].join(''));
});
it('should not directly affect the passed array', function () {
	var test = [1,2,3];
	var copy = [1,2,3];
	test.reduceRight(function (a, b) {
		return a + b;
	});
	proclaim.deepEqual(test, copy);
});
it('should skip non-set values', function () {
	var test = [1,2,3];
	delete test[1];
	var visited = {};
	test.reduceRight(function (a, b) {
		if (a) { visited[a] = true; }
		if (b) { visited[b] = true; }
		return 0;
	});
	proclaim.deepEqual(visited, { 1: true, 3: true });
});
it('should return an array with length 1', function () {
	proclaim.equal([1,2,3].reduceRight.length, 1);
});
