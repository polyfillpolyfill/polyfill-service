/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Array.prototype.values);
});

it('has correct arity', function () {
	proclaim.arity(Array.prototype.values, 0);
});

it('has correct name', function () {
	proclaim.hasName(Array.prototype.values, 'values');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Array.prototype, 'values');
});

it('is named \'values\' or \'ArrayValues\'', function () {
	// Don't fail tests just because browser doesn't support the Function.name polyfill.
	if ([].values.name) {
		try {
			proclaim.equal([].values.name, 'values');
		} catch (e) {
			// Chrome 40 implements the Symbol.iterator function for Arrays but has it named ArrayValues.
			try {
				proclaim.equal([].values.name, 'ArrayValues');
			} catch (e) {
				// Firefox 44 has it named [Symbol.iterator].
				proclaim.equal([].values.name, '[Symbol.iterator]');
			}
		}
	}
});

it('returns a next-able object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.values();

	proclaim.isInstanceOf(iterator.next, Function);
	proclaim.deepEqual(iterator.next(), {
		value: 'val1',
		done: false
	});
});

it('finally returns a done object', function () {
	var array = ['val1', 'val2'];
	var iterator = array.values();
	iterator.next();
	iterator.next();
	proclaim.deepEqual(iterator.next(), {
		value: undefined,
		done: true
	});
});
