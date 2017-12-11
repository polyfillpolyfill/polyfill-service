(function(global) {


	// Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
	var undefMarker = Symbol('undef');

	// NaN cannot be found in an array using indexOf, so we encode NaNs using a private symbol.
	var NaNMarker = Symbol('NaN');

	function encodeKey(key) {
		return Number.isNaN(key) ? NaNMarker : key;
	}
	function decodeKey(encodedKey) {
		return (encodedKey === NaNMarker) ? NaN : encodedKey;
	}

	function makeIterator(mapInst, getter) {
		var nextIdx = 0;
		var done = false;
		return {
			next: function() {
				if (!mapInst.size || nextIdx === mapInst._keys.length) {
					done = true;
				}
				if (!done) {
					while (nextIdx <= mapInst._keys.length) {
						if (mapInst._keys[nextIdx] === undefMarker) {
							nextIdx++;
						} else {
							break;
						}
					}
					if (!mapInst.size || nextIdx === mapInst._keys.length) {
						return {value: void 0, done:true};
					}
					return {value: getter.call(mapInst, nextIdx++), done: false};
				} else {
					return {value: void 0, done:true};
				}
			}
		};
	}

	function hasProtoMethod(instance, method){
		return typeof instance[method] === 'function';
	}

	var supportsGetters;

	var Map = function Map() {
		if (!(this instanceof Map)) {
			throw new TypeError('Constructor Map requires "new"');
		}

		var data = arguments[0];
		Object.defineProperty(this, '_keys', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: []
		});
		Object.defineProperty(this, '_values', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: []
		});
		Object.defineProperty(this, '_size', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: 0
		});

		// Some old engines do not support ES5 getters/setters.  Since Map only requires these for the size property, we can fall back to setting the size property statically each time the size of the map changes.
		try {
			Object.defineProperty(Map.prototype, 'size', {
				configurable: true,
				enumerable: false,
				get: function() {
					return this._size;
				},
				set: undefined
			});
			Object.defineProperty(this, 'size', {
				configurable: true,
				enumerable: false,
				get: function() {
					return this._size;
				},
				set: undefined
			});
			supportsGetters = true;
		} catch (e) {
			supportsGetters = false;
			Object.defineProperty(this, 'size', {
				configurable: true,
				enumerable: false,
				writable: true,
				value: 0
			});
		}
		// If `data` is iterable (indicated by presence of a forEach method), pre-populate the map
		if (data && hasProtoMethod(data, 'forEach')){
			// Fastpath: If `data` is a Map, shortcircuit all following the checks
			if (data instanceof Map ||
				// If `data` is not an instance of Map, it could be because you have a Map from an iframe or a worker or something.
				// Check if  `data` has all the `Map` methods and if so, assume data is another Map
				hasProtoMethod(data, 'clear') &&
				hasProtoMethod(data, 'delete') &&
				hasProtoMethod(data, 'entries') &&
				hasProtoMethod(data, 'forEach') &&
				hasProtoMethod(data, 'get') &&
				hasProtoMethod(data, 'has') &&
				hasProtoMethod(data, 'keys') &&
				hasProtoMethod(data, 'set') &&
				hasProtoMethod(data, 'values')){
				data.forEach(function (value, key) {
					this.set.apply(this, [key, value]);
				}, this);
			} else {
				data.forEach(function (item) {
					this.set.apply(this, item);
				}, this);
			}
		}
	};

	Object.defineProperty(Map, 'prototype', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: {}
	});

	Object.defineProperty(Map.prototype, 'get', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function get (key) {
			var idx = this._keys.indexOf(encodeKey(key));
			return (idx !== -1) ? this._values[idx] : undefined;
		}
	});
	Object.defineProperty(Map.prototype, 'set', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function set (key, value) {
			var idx = this._keys.indexOf(encodeKey(key));
			if (idx !== -1) {
				this._values[idx] = value;
			} else {
				this._keys.push(encodeKey(key));
				this._values.push(value);
				++this._size;
				if (!supportsGetters) {
					this.size = this._size;
				}
			}
			return this;
		}
	});
	Object.defineProperty(Map.prototype, 'has', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function has (key) {
			return (this._keys.indexOf(encodeKey(key)) !== -1);
		}
	});
	Object.defineProperty(Map.prototype, 'delete', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function (key) {
			var idx = this._keys.indexOf(encodeKey(key));
			if (idx === -1) return false;
			this._keys[idx] = undefMarker;
			this._values[idx] = undefMarker;
			--this._size;
			if (!supportsGetters) {
				this.size = this._size;
			}
			return true;
		}
	});
	Object.defineProperty(Map.prototype, 'clear', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function clear () {
			this._keys = [];
			this._values = [];
			this._size = 0;
			if (!supportsGetters) {
				this.size = this._size;
			}
		}
	});
	Object.defineProperty(Map.prototype, 'values', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function values () {
			var iterator = makeIterator(this, function(i) { return this._values[i]; });
			iterator[Symbol.iterator] = this.values.bind(this);
			return iterator;
		}
	});
	Object.defineProperty(Map.prototype, 'keys', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function keys () {
			var iterator = makeIterator(this, function(i) { return decodeKey(this._keys[i]); });
			iterator[Symbol.iterator] = this.keys.bind(this);
			return iterator;
		}
	});
	var entries = function entries () {
		var iterator = makeIterator(this, function(i) { return [decodeKey(this._keys[i]), this._values[i]]; });
		iterator[Symbol.iterator] = this.entries.bind(this);
		return iterator;
	};
	Object.defineProperty(Map.prototype, Symbol.iterator, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: entries
	});
	Object.defineProperty(Map.prototype, 'entries', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: entries
	});
	Object.defineProperty(Map.prototype, 'forEach', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function(callbackFn, thisArg) {
			thisArg = thisArg || global;
			var iterator = this.entries();
			var result = iterator.next();
			while (result.done === false) {
				callbackFn.call(thisArg, result.value[1], result.value[0], this);
				result = iterator.next();
			}
		}
	});
	Object.defineProperty(Map.prototype, 'constructor', {
		configurable: true,
		enumerable: false,
		writable: true,
		value: Map
	});
	try {
		Object.defineProperty(Map, Symbol.species, {
			configurable: true,
			enumerable: false,
			get: function get() {
				return Map;
			}
		});
	} catch (e) {}

	// Safari 8 sets the name property with correct value but also to be non-configurable
	if (!('name' in Map)) {
		Object.defineProperty(Map, 'name', {
			configurable: true,
			enumerable: false,
			writable: false,
			value: 'Map'
		});
	}

	// Export the object
	try {
		Object.defineProperty(global, 'Map', {
			configurable: true,
			enumerable: false,
			writable: true,
			value: Map
		});
	} catch (e) {
		// IE8 throws an error here if we set enumerable to false.
		// More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
		Object.defineProperty(global, 'Map', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: Map
		});
	}

}(this));
