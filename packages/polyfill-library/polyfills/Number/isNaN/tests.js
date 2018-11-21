/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.isNaN);
});

it('has correct arity', function () {
	proclaim.arity(Number.isNaN, 1);
});

it('has correct name', function () {
	proclaim.hasName(Number.isNaN, 'isNaN');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Number, 'isNaN');
});

it('returns true with NaN values', function () {
	proclaim.isTrue(Number.isNaN(NaN));
	proclaim.isTrue(Number.isNaN(Number.NaN));
	proclaim.isTrue(Number.isNaN(0 / 0));
});

it('retuns false for valid numbers and non-number data types', function () {
	proclaim.isFalse(Number.isNaN("NaN"));
	proclaim.isFalse(Number.isNaN(undefined));
	proclaim.isFalse(Number.isNaN({}));
	proclaim.isFalse(Number.isNaN("blabla"));
	proclaim.isFalse(Number.isNaN(true));
	proclaim.isFalse(Number.isNaN(37));
	proclaim.isFalse(Number.isNaN("37"));
	proclaim.isFalse(Number.isNaN(1));
	proclaim.isFalse(Number.isNaN(0.1));
	proclaim.isFalse(Number.isNaN(-1));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 16)));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 16) - 1));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 31)));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 31) - 1));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 32)));
	proclaim.isFalse(Number.isNaN(Math.pow(2, 32) - 1));
	proclaim.isFalse(Number.isNaN(-0));
	proclaim.isFalse(Number.isNaN(Infinity));
	proclaim.isFalse(Number.isNaN('5'));
	proclaim.isFalse(Number.isNaN(false));
	proclaim.isFalse(Number.isNaN(new Number(NaN)));
	proclaim.isFalse(Number.isNaN(new Number(Infinity)));
	proclaim.isFalse(Number.isNaN(new Number(5)));
	proclaim.isFalse(Number.isNaN(new Number(0.1)));
	proclaim.isFalse(Number.isNaN(null));
	proclaim.isFalse(Number.isNaN(function () {}));
	if ('create' in Object) {
		proclaim.isFalse(Number.isNaN(Object.create(null)));
	}
});
