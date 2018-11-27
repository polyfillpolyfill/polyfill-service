/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.flat);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.flat, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.flat, 'flat');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'flat');
});

var testSubject;

beforeEach(function () {
	testSubject = [2, 3, undefined, true, 'hej', null, false, 0];
	delete testSubject[1];
});

it('should pass the right parameters', function () {
	var args = [];
	var argsspy = function() { args = [].slice.call(arguments); };
	var array = ['1'];
	array.forEach(argsspy);
	proclaim.deepEqual(args, ['1', 0, array]);
});

it('should not affect elements added to the array after it has begun', function () {
	var arr = [1,2,3],
		i = 0;
	arr.flat(function (a) {
		i++;
		arr.push(a + 3);
	});
	proclaim.deepEqual(arr, [1,2,3,4,5,6]);
	proclaim.equal(i, 3);
});

it('should set the right context when given none', function () {
	var context;
	[1].forEach(function () { context = this; });
	proclaim.strictEqual(context, function () { return this; }.call());
});

describe('strings', function () {
	var str = 'Hello, World!';

	it('should iterate all in a string', function () {
		var actual = Array.prototype.flat.call(str);

		proclaim.deepEqual(actual, str.split(''));
	});
});
