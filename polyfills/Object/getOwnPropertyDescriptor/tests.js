describe('Basic functionality', function () {
	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	        for (var _ in obj) { return false; }
			return obj.x === obj;
		} catch (e) { // this is IE 8.
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

	var enumDescriptor = {
		configurable: true,
		enumerable: false,
		value: true,
		writable: false
	};
	var writableDescriptor = {
		configurable: true,
		enumerable: true,
		value: 42,
		writable: true
	};

	if (supportsDescriptors) {
		it('works with Object.prototype poisoned setter', function () {
			var key = 'foo';

			var obj = {};
			obj[key] = 42;

			var expected = {};
			expected[key] = {
				configurable: true,
				enumerable: true,
				value: 42,
				writable: true
			};

			Object.defineProperty(Object.prototype, key, { configurable: true, set: function (v) { throw new Error(v); } });

			expect(function () {
				var result = Object.getOwnPropertyDescriptors(obj);
				expect(result).to.equal(expected);
			}).to.not.throwException()

			delete Object.prototype[key];
		});

		it('gets all expected non-Symbol descriptors', function () {
			var obj = { normal: Infinity };
			Object.defineProperty(obj, 'enumerable', enumDescriptor);
			Object.defineProperty(obj, 'writable', writableDescriptor);

			var descriptors = Object.getOwnPropertyDescriptors(obj);

			expect(descriptors).to.equal({
				enumerable: enumDescriptor,
				normal: {
					configurable: true,
					enumerable: true,
					value: Infinity,
					writable: true
				},
				writable: writableDescriptor
			});
		});
	}
});
