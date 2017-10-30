/* eslint-env mocha, browser */
/* global proclaim */

describe('Uint8Array', function () {
	it('is a function', function () {
		proclaim.isFunction(Uint8Array);
	});

	it('takes 3 named arguments', function () {
		proclaim.equal(Uint8Array.length, 3);
	});

	it('has BYTES_PER_ELEMENT set to 1', function () {
		proclaim.equal(Uint8Array.BYTES_PER_ELEMENT, 1);
	});

});
