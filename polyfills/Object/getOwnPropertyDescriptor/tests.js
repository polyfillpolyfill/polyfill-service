/* eslint-env mocha, browser */
/* global proclaim */

// Copied from ES5-Shim

describe('Basic functionality', function () {
	it('should return undefined because the object does not own the property', function () {
        var descr = Object.getOwnPropertyDescriptor({}, 'name');

        proclaim.equal(descr, undefined);
    });

    it('should return a data descriptor', function () {
        var descr = Object.getOwnPropertyDescriptor({ name: 'Testing' }, 'name');
        var expected = {
            enumerable: true,
            configurable: true,
            value: 'Testing',
            writable: true
        };

        proclaim.deepEqual(descr, expected);
    });

    if ('create' in Object) {
	    it('should return undefined because the object does not own the property', function () {
	        var descr = Object.getOwnPropertyDescriptor(Object.create({ name: 'Testing' }, {}), 'name');

	        proclaim.equal(descr, undefined);
	    });

    	it('should return a data descriptor', function () {
	        var expected = {
	            value: 'Testing',
	            configurable: true,
	            enumerable: true,
	            writable: true
	        };
	        var obj = Object.create({}, { name: expected });

	        var descr = Object.getOwnPropertyDescriptor(obj, 'name');

	        proclaim.deepEqual(descr, expected);
	    });
    }

    it('should throw error for non object', function () {
	try {
		// note: in ES6, we expect this to return undefined.
		proclaim.isUndefined(Object.getOwnPropertyDescriptor(42, 'name'));
	} catch (err) {
		proclaim.isInstanceOf(err, TypeError);
	}
    });
});
