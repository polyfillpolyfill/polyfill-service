/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.isInteger);
});

it('has correct arity', function () {
	proclaim.arity(Number.isInteger, 1);
});

it('has correct name', function () {
	proclaim.hasName(Number.isInteger, 'isInteger');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Number, 'isInteger');
});

it('returns true with integer values', function () {
	proclaim.isTrue(Number.isInteger(0));
	proclaim.isTrue(Number.isInteger(1));
	proclaim.isTrue(Number.isInteger(-100000));
	proclaim.isTrue(Number.isInteger(-1));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 16)));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 16) - 1));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 31)));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 31) - 1));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 32)));
	proclaim.isTrue(Number.isInteger(Math.pow(2, 32) - 1));
	proclaim.isTrue(Number.isInteger(-0));
});

it('returns false for non integer values', function () {
	proclaim.isFalse(Number.isInteger(0.1));
	proclaim.isFalse(Number.isInteger(Math.PI));
	proclaim.isFalse(Number.isInteger(Infinity));
	proclaim.isFalse(Number.isInteger(-Infinity));
	proclaim.isFalse(Number.isInteger("10"));
	proclaim.isFalse(Number.isInteger(true));
	proclaim.isFalse(Number.isInteger(false));
	proclaim.isFalse(Number.isInteger([1]));
	proclaim.isFalse(Number.isInteger(NaN));
	proclaim.isFalse(Number.isInteger('NaN'));
	proclaim.isFalse(Number.isInteger('5'));
	proclaim.isFalse(Number.isInteger(new Number(NaN)));
	proclaim.isFalse(Number.isInteger(new Number(Infinity)));
	proclaim.isFalse(Number.isInteger(new Number(5)));
	proclaim.isFalse(Number.isInteger(new Number(0.1)));
	proclaim.isFalse(Number.isInteger(undefined));
	proclaim.isFalse(Number.isInteger(null));
	proclaim.isFalse(Number.isInteger({}));
	proclaim.isFalse(Number.isInteger(function () {}));
	if ('create' in Object) {
		proclaim.isFalse(Number.isInteger(Object.create(null)));
	}
});
