// Copied from ES5-Shim

describe('Basic functionality', function () {
	it('should return undefined because the object does not own the property', function () {
        var descr = Object.getOwnPropertyDescriptor({}, 'name');

        expect(descr).to.be(undefined);
    });

    it('should return a data descriptor', function () {
        var descr = Object.getOwnPropertyDescriptor({ name: 'Testing' }, 'name');
        var expected = {
            enumerable: true,
            configurable: true,
            value: 'Testing'
        };

        expect(descr).to.eql(expected);
    });

    if ('create' in Object) {
	    it('should return undefined because the object does not own the property', function () {
	        var descr = Object.getOwnPropertyDescriptor(Object.create({ name: 'Testing' }, {}), 'name');

	        expect(descr).to.be(undefined);
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

	        expect(descr).to.eql(expected);
	    });
    }

    it('should throw error for non object', function () {
    	expect(function() {
        	Object.getOwnPropertyDescriptor(42, 'name');
    	}).to.throwError()
    });
});
