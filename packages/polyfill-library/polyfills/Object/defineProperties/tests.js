/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.defineProperties);
});

it('has correct arity', function () {
	proclaim.arity(Object.defineProperties, 2);
});

it('has correct name', function () {
	proclaim.hasName(Object.defineProperties, 'defineProperties');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Object, 'defineProperties');
});

it('works as expected', function () {
	var source = {};
	var result = Object.defineProperties(source, {
		q: {
			value: 42
		},
		w: {
			value: 33
		}
	});
	proclaim.deepEqual(result, source);
	proclaim.equal(result.q, 42);
	proclaim.equal(result.w, 33);
});
