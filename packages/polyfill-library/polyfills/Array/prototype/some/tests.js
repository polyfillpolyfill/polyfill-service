/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.some);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.some, 1);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.some, 'some');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'some');
});

beforeEach(function() {
	this.array = [0, 2, 4, 6, 8, 10, 12, 14];
});

it("Should not accept a function argument that is not callable", function() {
	var array = this.array;
	proclaim.throws(function() { array.some({}); }, TypeError);
});

it("Should accept a function with three parameters: the value of the element, the index of the element and the object being traversed", function() {
	var array = this.array;

	array.some(function(value, index, object) {
		proclaim.strictEqual(object, array);
		proclaim.equal(object[index], value);
		return false;
	});
});

it("Should accept an optional 'this' argument as its second argument which becomes the 'this' value for the function argument", function() {
	var mockThis = { foo: "bar" };
	var array = this.array;

	array.some(function() {
		proclaim.strictEqual(this, mockThis);
		proclaim.equal(this.foo, mockThis.foo);
		return false;
	}, mockThis);
});

it("Should pass a reference to the array as the third parameter to the function argument", function() {
	var array = [10];

	array.some(function(value, index, object) {
		object[0] = 100;
		return false;
	});

	proclaim.equal(array[0], 100);
});

it("Should not iterate over elements appended to the array after the call to some.  The range is fixed before the first call to the callback", function() {
	var array = [1, 2, 3, 4, 5, 6];
	var visited = [];

	array.some(function(value, index) {
		array.push(index);
		visited[index] = value;
		return false;
	});

	proclaim.deepEqual(visited, [1, 2, 3, 4, 5, 6]);

	// Expect the original array to be the same for the first 6 elements, with
	// the additional 0, 1, .. 5 appended (the indices of the first 6 elements
	// in the range covered by some at the start of its invocation
	proclaim.deepEqual(array, [1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5]);
});

it("Should return false if the array is empty", function() {
	var a = [];
	proclaim.equal(a.some(function() { return true; }), false);
});

it("Should not visit elements that are deleted after the call to some begins and before being visited", function() {
	var a = [1, 2, 3, 4, 5, 6];
	var visited = [];

	a.some(function(value, index, object) {
		delete object[5];
		visited.push(index);
		return false;
	});

	// Should only visit the first 5 indices
	proclaim.deepEqual(visited, [0, 1, 2, 3, 4]);
});

it("Should return true as soon as the callback returns true", function() {
	var a = [0, 1, 2, 3, 4];
	var visited = [];
	proclaim.equal(a.some(function(value) {
		visited.push(value);
		return value > 2;
	}), true);

	proclaim.deepEqual(visited, [0, 1, 2, 3]);
});

it("Should return false if the callback never returns true", function() {
	var a = [0, 1, 2, 3, 4];
	var visited = [];
	proclaim.equal(a.some(function(value) {
		visited.push(value);
		return false;
	}), false);

	proclaim.deepEqual(visited, a);
});
