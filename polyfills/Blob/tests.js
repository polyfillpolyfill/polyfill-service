/* eslint-env mocha, browser */
/* global proclaim */
describe('Blob', function () {

	it('should expose a property named Blob on the global object', function() {
		proclaim.isTrue('Blob' in window);
	});

	it('Blob should be a function', function() {
		proclaim.isFunction(window.Blob);
	});

	it('Blob should have a length of 0', function() {
		proclaim.equal(window.Blob.length, 0);
	});

	it('throws an error if called without `new` operator', function () {
		proclaim.throws(function () {
			Blob();
		}, TypeError);
	});

	it('throws an error if called with null', function () {
		proclaim.throws(function () {
			new Blob(null);
		}, TypeError);
	});

	it('throws an error if called with true', function () {
		proclaim.throws(function () {
			new Blob(true);
		}, TypeError);
	});

	it('throws an error if called with false', function () {
		proclaim.throws(function () {
			new Blob(false);
		}, TypeError);
	});

	it('throws an error if called with 0', function () {
		proclaim.throws(function () {
			new Blob(0);
		}, TypeError);
	});

	it('throws an error if called with 1', function () {
		proclaim.throws(function () {
			new Blob(1);
		}, TypeError);
	});

	it('throws an error if called with decimal number', function () {
		proclaim.throws(function () {
			new Blob(1.5);
		}, TypeError);
	});

	it('throws an error if called with a string', function () {
		proclaim.throws(function () {
			new Blob('fail');
		}, TypeError);
	});

	it('throws an error if called with a date', function () {
		proclaim.throws(function () {
			new Blob(new Date());
		}, TypeError);
	});

	it('throws an error if called with a RegExp', function () {
		proclaim.throws(function () {
			new Blob(new RegExp());
		}, TypeError);
	});

	// This requires rewriting the polyfill to take into account iterable objects defined via Symbol.iterator instead of being based on blobParts.length property
	it.skip('throws an error if called with an object', function () {
		proclaim.throws(function () {
			new Blob({});
		}, TypeError);
		proclaim.throws(function () {
			new Blob({ 0: 'fail', length: 1 });
		}, TypeError);
	});

	it('throws an error if called with a div', function () {
		proclaim.throws(function () {
			new Blob(document.createElement('div'));
		}, TypeError);
	});

	// This requires rewriting the polyfill to take into account iterable objects defined via Symbol.iterator instead of being based on blobParts.length property
	it.skip('throws an error if called with window', function () {
		proclaim.throws(function () {
			new Blob(window);
		}, TypeError);
	});

	it('can construct a Blob when given `undefined`', function () {
		var blob = new Blob();
		proclaim.equal(blob.size, 0);
		proclaim.equal(blob.type, '');
	});

	it('can construct a Blob when called with an empty Array', function () {
		var blob = new Blob([]);
		proclaim.equal(blob.size, 0);
		proclaim.equal(blob.type, '');
	});

	it('can construct a Blob when called with an Array', function () {
		var blob = new Blob([null, true, false, 0, 1, 1.5, 'fail', {}]);
		proclaim.equal(blob.size, 37);
		proclaim.equal(blob.type, '');
	});

	it('should be able to construct a Blob object when called with an array of Blob objects', function () {
		var blob = new Blob([new Blob(['1']), new Blob(['2'])]);
		proclaim.equal(blob.size, 2);
		proclaim.equal(blob.type, '');
	});

	it('should throw if second argument is an integer', function () {
		proclaim.throws(function () {
			new Blob([], 12345);
		}, TypeError);
	});

	it('should throw if second argument is an decimal number', function () {
		proclaim.throws(function () {
			new Blob([], 1.2);
		}, TypeError);
	});

	it('should throw if second argument is an boolean', function () {
		proclaim.throws(function () {
			new Blob([], true);
		}, TypeError);
	});

	it('should throw if second argument is an string', function () {
		proclaim.throws(function () {
			new Blob([], '12345');
		}, TypeError);
	});

	it('should use the type property of the second argument as the type property on the returned Blob object', function () {
		var blob = new Blob([], { type: 'test' });
		proclaim.equal(blob.size, 0);
		proclaim.equal(blob.type, 'test');
	});

	it('returns new full blob is slice is called with no arguments', function () {
		var blob1 = new Blob(['test']);
		var blob2 = blob1.slice();
		proclaim.notStrictEqual(blob1, blob2);
		proclaim.equal(blob2.size, 4);
		proclaim.equal(blob2.type, '');
	});

	it('uses first argument of slice to decide where to start the slice', function () {
		var blob1 = new Blob(['test']);
		var blob2 = blob1.slice(1);
		proclaim.equal(blob2.size, 3);
	});

	it('if first argument of slice is greather than blob size, return an empty blob', function () {
		var blob1 = new Blob(['test']);
		var blob2 = blob1.slice(5);
		proclaim.equal(blob2.size, 0);
	});

	it('uses second argument of slice to decide where to end the slice', function () {
		var blob1 = new Blob(['test']);
		var blob2 = blob1.slice(0, 1);
		proclaim.equal(blob2.size, 1);
	});

	it('if second argument of slice is less than first argument, return an empty blob', function () {
		var blob1 = new Blob(['test']);
		var blob2 = blob1.slice(2,1);
		proclaim.equal(blob2.size, 0);
	});

	it('uses third argument of slice to decide as the type of the new blob', function () {
		var blob1 = new Blob(['test']);
		var blob2 = blob1.slice(0, 1, 'a');
		proclaim.equal(blob2.size, 1);
		proclaim.equal(blob1.type, '');
		proclaim.equal(blob2.type, 'a');
	});
});
