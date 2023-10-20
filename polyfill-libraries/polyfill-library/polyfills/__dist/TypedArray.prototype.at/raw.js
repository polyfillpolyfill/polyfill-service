
// TypedArray.prototype.at
/* global CreateMethodProperty, Uint8Array, ToIntegerOrInfinity, ToString */
// 23.2.3.1. %TypedArray%.prototype.at ( index )
(function () {
	// In Internet Explorer 8 there is no support for square-bracket notation
	// in the TypedArrays polyfill instead so we need to use the private `_getter` method
	var typedArraysSupportIndexLookup = (function() {
		var uint8 = new Uint8Array(2);
		uint8[0] = 42;
		return uint8[0] === 42
	})

	function getTypedArrayIndex(array, index) {
		if (typedArraysSupportIndexLookup) {
			return array[index];
		} else {
			return array._getter(index);
		}
	}

	function at(index) {
		// 1. Let O be the this value.
		var O = this;
		// 2. Perform ? ValidateTypedArray(O).
		// TODO: Add ValidateTypedArray
		// 3. Let len be O.[[ArrayLength]].
		var len = O.length;
		// 4. Let relativeIndex be ? ToIntegerOrInfinity(index).
		var relativeIndex = ToIntegerOrInfinity(index);
		// 5. If relativeIndex ≥ 0, then
		// 5.a. Let k be relativeIndex.
		// 6. Else,
		// 6.a. Let k be len + relativeIndex.
		var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
		// 7. If k < 0 or k ≥ len, return undefined.
		if (k < 0 || k >= len) return undefined;
		// 8. Return ! Get(O, ! ToString(𝔽(k))).
		// return Get(O, ToString(k));
		return getTypedArrayIndex(O, ToString(k));
	}

	if ('__proto__' in self.Int8Array.prototype) {
		// set this on the underlying "TypedArrayPrototype", which is shared with all "TypedArray" subclasses
		CreateMethodProperty(self.Int8Array.prototype.__proto__, 'at', at);
	} else {
		CreateMethodProperty(self.Int8Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint8Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint8ClampedArray.prototype, 'at', at);
		CreateMethodProperty(self.Int16Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint16Array.prototype, 'at', at);
		CreateMethodProperty(self.Int32Array.prototype, 'at', at);
		CreateMethodProperty(self.Uint32Array.prototype, 'at', at);
		CreateMethodProperty(self.Float32Array.prototype, 'at', at);
		CreateMethodProperty(self.Float64Array.prototype, 'at', at);
	}
})();
