describe('Basic functionality', function () {
	var
	object = {},
	property = 'foo',
	value = 'bar';

	it('Returns the object being defined', function () {
		expect(Object.defineProperty(object, property, {
			configurable: true,
			enumerable: true,
			writable: true
		})).to.equal(object);
	});

	it('Assigns a property', function () {
		expect(property in object).to.equal(true);
	});

	it('Assigns a property with a value', function () {
		Object.defineProperty(object, property, {
			configurable: true,
			enumerable: true,
			value: value,
			writable: true
		});

		expect(object[property]).to.equal(value);
	});

	it('Assigns a property with a getter', function () {
		Object.defineProperty(object, property, {
			configurable: true,
			enumerable: true,
			get: function () {
				return value;
			}
		});

		expect(object[property]).to.equal(value);
	});
});

describe('Error handling', function () {
	var
	object = {},
	property = 'foo',
	value = 'bar';

	it('Throws an error when called on a non-object', function() {
		expect(function () {
			Object.defineProperty();
		}).to.throwException();

		expect(function () {
			Object.defineProperty(undefined);
		}).to.throwException();

		expect(function () {
			Object.defineProperty(null);
		}).to.throwException();

		expect(function () {
			Object.defineProperty('');
		}).to.throwException();
	});

	it('Throws an error when descriptor is a non-object', function() {
		expect(function () {
			Object.defineProperty(object, property);
		}).to.throwException();

		expect(function () {
			Object.defineProperty(object, property, undefined);
		});

		expect(function () {
			Object.defineProperty(object, property, null);
		});

		expect(function () {
			Object.defineProperty(object, property, '');
		});
	});
});
