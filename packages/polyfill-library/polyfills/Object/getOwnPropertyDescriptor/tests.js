/* eslint-env mocha, browser */
/* global proclaim */

it('is a function', function () {
	proclaim.isFunction(Object.getOwnPropertyDescriptor);
});

it('has correct arity', function () {
	proclaim.arity(Object.getOwnPropertyDescriptor, 2);
});

it('has correct name', function () {
	proclaim.hasName(Object.getOwnPropertyDescriptor, 'getOwnPropertyDescriptor');
});

it('is not enumerable', function () {
	proclaim.nonEnumerable(Object, 'getOwnPropertyDescriptor');
});

var propertyDescriptorsSupported = (function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { // this is IE 8.
		return false;
	}
}());

it('works as expected', function () {
	var getOwnPropertyDescriptor, O, s, descs;
	getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	if ('create' in Object && 'Symbol' in this) {
		O = Object.create({
			q: 1
		}, {
				e: {
					value: 3
				}
			});
		O.w = 2;
		s = Symbol('s');
		O[s] = 4;
		descs = getOwnPropertyDescriptor(O);
		proclaim.strictEqual(descs.q, void 8);
		proclaim.deepEqual(descs.w, {
			enumerable: true,
			configurable: true,
			writable: true,
			value: 2
		});
		if (propertyDescriptorsSupported) {
			proclaim.deepEqual(descs.e, {
				enumerable: false,
				configurable: false,
				writable: false,
				value: 3
			});
		} else {
			proclaim.deepEqual(descs.e, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: 3
			});
		}
		proclaim.strictEqual(descs[s].value, 4);
	}
});

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
