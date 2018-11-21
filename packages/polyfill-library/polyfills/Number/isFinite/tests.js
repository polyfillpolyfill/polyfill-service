/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Number.isFinite);
});

it('has correct arity', function () {
	proclaim.arity(Number.isFinite, 1);
});

it('has correct name', function () {
	proclaim.hasName(Number.isFinite, 'isFinite');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Number, 'isFinite');
});

it('returns true with finite values', function () {
	proclaim.isTrue(Number.isFinite(0));
	proclaim.isTrue(Number.isFinite(2e64));
	proclaim.isTrue(Number.isFinite(1));
	proclaim.isTrue(Number.isFinite(0.1));
	proclaim.isTrue(Number.isFinite(-1));
	proclaim.isTrue(Number.isFinite(Math.pow(2, 16)));
	proclaim.isTrue(Number.isFinite(Math.pow(2, 16) - 1));
	proclaim.isTrue(Number.isFinite(Math.pow(2, 31)));
	proclaim.isTrue(Number.isFinite(Math.pow(2, 31) - 1));
	proclaim.isTrue(Number.isFinite(Math.pow(2, 32)));
	proclaim.isTrue(Number.isFinite(Math.pow(2, 32) - 1));
	proclaim.isTrue(Number.isFinite(-0));
});

it('retuns false for infinite values', function () {
	proclaim.isFalse(Number.isFinite("0"));
	proclaim.isFalse(Number.isFinite(null));
	proclaim.isFalse(Number.isFinite(undefined));
	proclaim.isFalse(Number.isFinite(Infinity));
	proclaim.isFalse(Number.isFinite(-Infinity));
	proclaim.isFalse(Number.isFinite(NaN));
	if ('create' in Object) {
		proclaim.isFalse(Number.isFinite(Object.create(null)));
	}
	proclaim.isFalse(Number.isFinite(function () {}));
	proclaim.isFalse(Number.isFinite({}));
	proclaim.isFalse(Number.isFinite(new Number(0.1)));
	proclaim.isFalse(Number.isFinite(new Number(5)));
	proclaim.isFalse(Number.isFinite(new Number(Infinity)));
	proclaim.isFalse(Number.isFinite(new Number(NaN)));
	proclaim.isFalse(Number.isFinite(false));
	proclaim.isFalse(Number.isFinite('5'));
	proclaim.isFalse(Number.isFinite('NaN'));
});
