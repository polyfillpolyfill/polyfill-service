/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.map);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.map, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.map, 'map');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Array.prototype, 'map');
});

var callback;
var testSubject;
beforeEach(function () {
	var i = 0;
	callback = function () {
		return i++;
	};
	testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
	delete testSubject[1];
});

it('should call callback with the right parameters', function () {
	var args = [];
	var argsspy = function() { args = [].slice.call(arguments); };
	var array = [1];
	array.map(argsspy);
	proclaim.deepEqual(args, ['1', 0, array]);
});
it('should set the context correctly', function () {
	var context = {};
	testSubject.map(function (o,i) {
		this[i] = o;
	}, context);
	proclaim.deepEqual(context, testSubject);
});
it('should set the right context when given none', function () {
	var context;
	[1].map(function () {context = this;});
	proclaim.strictEqual(context, function () { return this; }.call());
});
it('should not change the array it is called on', function () {
	var copy = testSubject.slice();
	testSubject.map(callback);
	proclaim.deepEqual(testSubject, copy);
});
it('should only run for the number of objects in the array when it started', function () {
	var arr = [1,2,3],
		i = 0;
	arr.map(function (o) {
		arr.push(o + 3);
		i++;
		return o;
	});
	proclaim.deepEqual(arr, [1, 2, 3, 4, 5, 6]);
	proclaim.equal(i, 3);
});

// IE6-8 does not distinguish between dense and sparse arrays
// it('should properly translate the values as according to the callback', function () {
// 	var result = testSubject.map(callback),
// 		expected = [0, 0, 1, 2, 3, 4, 5, 6];

// 	delete expected[1];
// 	proclaim.deepEqual(result, expected);
// });
it('should skip non-existing values', function () {
	var array = [1, 2, 3, 4],
		i = 0;
	delete array[2];
	array.map(function () {
		i++;
	});
	proclaim.equal(i, 3);
});
