/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.cosh);
});

it('has correct arity', function () {
	proclaim.arity(Math.cosh, 1);
});

it('has correct name', function () {
	proclaim.hasName(Math.cosh, 'cosh');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'cosh');
});

it('works as expected when called with no arguments', function () {
	proclaim.isNaN(Math.cosh());
});

it('works as expected when called with undefined', function () {
	proclaim.isNaN(Math.cosh(undefined));
});

it('works as expected when called with Infinity', function () {
	proclaim.strictEqual(Math.cosh(Infinity), Infinity);
});

it('works as expected when called with -Infinity', function () {
	proclaim.strictEqual(Math.cosh(-Infinity), Infinity);
});

it('works as expected when called with NaN', function () {
	proclaim.isNaN(Math.cosh(NaN));
});

it('works as expected when called with 0', function () {
	proclaim.strictEqual(Math.cosh(0), 1);
});

it('works as expected when called with -0', function () {
	proclaim.strictEqual(Math.cosh(-0), 1);
});

it('works as expected when called with positive integers', function () {
	proclaim.strictEqual(Math.cosh(1), 1.5430806348152437);
	try {
		proclaim.strictEqual(Math.cosh(90), 6.102016471589204e38);
	} catch (err) {
		proclaim.almostEqual(Math.cosh(90), 6.102016471589204e38, -38);
	}
	try {
		proclaim.strictEqual(Math.cosh(709), 4.109203730777486e307);
	} catch (err) {
		proclaim.almostEqual(Math.cosh(709), 4.109203730777486e307, -307);
	}
	proclaim.isTrue(Math.cosh(710) >= 1.1169973830808552e+308);
	proclaim.notStrictEqual(Math.cosh(710), Infinity);
	proclaim.isNotNaN(Math.cosh(710));
	proclaim.strictEqual(Math.cosh(711), Infinity);
});

it('works as expected when called with positive real numbers', function () {
	proclaim.strictEqual(Math.cosh(0.5), 1.1276259652063807);
});

it('works as expected when called with negative integers', function () {
	proclaim.strictEqual(Math.cosh(-1), 1.5430806348152437);
	try {
		proclaim.strictEqual(Math.cosh(-90), 6.102016471589204e38);
	} catch (err) {
		proclaim.almostEqual(Math.cosh(-90), 6.102016471589204e38, -38);
	}
});

it('works as expected when called with negative real numbers', function () {
	proclaim.strictEqual(Math.cosh(-0.5), 1.1276259652063807);
	proclaim.strictEqual(Math.cosh(-2e-17), 1);
});
