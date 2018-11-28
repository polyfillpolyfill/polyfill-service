/* eslint-env mocha */
/* globals proclaim */

it('is a function', function () {
	proclaim.isFunction(Math.hypot);
});

it('has correct arity', function () {
	proclaim.arity(Math.hypot, 2);
});

it('has correct name', function () {
	proclaim.hasName(Math.hypot, 'hypot');
});

it('is not enumerable', function () {
	proclaim.isNotEnumerable(Math, 'hypot');
});


it('works as expected', function () {
	proclaim.isNaN(Math.hypot({}));
	proclaim.isNaN(Math.hypot(undefined, 0));
	proclaim.isNaN(Math.hypot(0, undefined));
	proclaim.strictEqual(Math.hypot(1), 1);
	proclaim.strictEqual(Math.hypot(Math.PI), Math.PI);
	proclaim.strictEqual(Math.hypot(3, 4), 5);
	proclaim.strictEqual(Math.hypot(3, 4, 12), 13);
	proclaim.strictEqual(Math.hypot(
		" 12 ",
		"0xf",
		{ valueOf: function () { return "0x10"; } }
	), 25);
	proclaim.strictEqual(Math.hypot(
		{ valueOf: function () { return 6; } },
		{ toString: function () { return 8; } },
		{ toString: function () { return "24"; } }
	), 26);


	// Check that Infinity is returned if any of the arguments is +/-Infinity.
	proclaim.strictEqual(Math.hypot(Infinity), Infinity);
	proclaim.strictEqual(Math.hypot(-Infinity), Infinity);
	proclaim.strictEqual(Math.hypot(1, 2, 3, 4, 5, 6, Infinity), Infinity);
	proclaim.strictEqual(Math.hypot(1, 2, 3, 4, 5, 6, -Infinity), Infinity);
	proclaim.strictEqual(Math.hypot(NaN, Infinity), Infinity);

	// Check that NaN is returned if any argument is NaN and none is +/-Infinity/
	proclaim.isNaN(Math.hypot(NaN));
	proclaim.isNaN(Math.hypot(1, 2, 3, 4, 5, 6, NaN));

	// Check that +0 is returned if all arguments are +/-0.
	proclaim.strictEqual(1/Math.hypot(0), Infinity);
	proclaim.strictEqual(1/Math.hypot(0, 0, 0, 0, 0, 0, -0), Infinity);

	// Check that +0 is returned for no arguments.
	proclaim.strictEqual(1 / Math.hypot(), Infinity);

	// Check that we avoid overflows and underflows.
	proclaim.almostEqual(Math.hypot(3e100, 4e100), 5e100);
	proclaim.almostEqual(Math.hypot(3e-300, 4e-300), 5e-300);
	proclaim.almostEqual(Math.hypot(6e300, 6e300, 17e300), 19e300);
});
