// Copied from ES5-Shim

describe('Basic functionality', function () {
	it('should return undefined because the object does not own the property', function () {
        var descr = Object.getOwnPropertyDescriptor({}, 'name');

        expect(descr).to.be(undefined);
    });

    it('should return a data descriptor', function () {
        var descr = Object.getOwnPropertyDescriptor({ name: 'Testing' }, 'name');
        var expected = {
            value: 'Testing',
            enumerable: true,
            writable: true,
            configurable: true
        };

        expect(descr).to.eql(expected);
    });

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

    it('should throw error for non object', function () {
        try {
        	Object.getOwnPropertyDescriptor(42, 'name');
        } catch (err) {
            expect(err).to.eql(TypeError);
        }
    });
});
