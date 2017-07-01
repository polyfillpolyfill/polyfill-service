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
				if (nextIdx === mapInst._keys.length) done = true;
				if (!done) {
					while (mapInst._keys[nextIdx] === undefMarker) nextIdx++;
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

	var Map = function(data) {
		this._keys = [];
		this._values = [];
		this.size = this._size = 0;
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
	Map.prototype = {};

	// Some old engines do not support ES5 getters/setters.  Since Map only requires these for the size property, we can fall back to setting the size property statically each time the size of the map changes.
	try {
		Object.defineProperty(Map.prototype, 'size', {
			get: function() {
				return this._size;
			}
		});
	} catch(e) {
	}

	Map.prototype['get'] = function(key) {
		var idx = this._keys.indexOf(encodeKey(key));
		return (idx !== -1) ? this._values[idx] : undefined;
	};
	Map.prototype['set'] = function(key, value) {
		var idx = this._keys.indexOf(encodeKey(key));
		if (idx !== -1) {
			this._values[idx] = value;
		} else {
			this._keys.push(encodeKey(key));
			this._values.push(value);

			this.size = ++this._size;
		}
		return this;
	};
	Map.prototype['has'] = function(key) {
		return (this._keys.indexOf(encodeKey(key)) !== -1);
	};
	Map.prototype['delete'] = function(key) {
		var idx = this._keys.indexOf(encodeKey(key));
		if (idx === -1) return false;
		this._keys[idx] = undefMarker;
		this._values[idx] = undefMarker;

		this.size = --this._size;
		return true;
	};
	Map.prototype['clear'] = function() {
		this._keys = [];
		this._values = [];
		this.size = this._size = 0;
	};
	Map.prototype['values'] = function() {
		return makeIterator(this, function(i) { return this._values[i]; });
	};
	Map.prototype['keys'] = function() {
		return makeIterator(this, function(i) { return decodeKey(this._keys[i]); });
	};
	Map.prototype['entries'] =
	Map.prototype[Symbol.iterator] = function() {
		return makeIterator(this, function(i) { return [decodeKey(this._keys[i]), this._values[i]]; });
	};
	Map.prototype['forEach'] = function(callbackFn, thisArg) {
		thisArg = thisArg || global;
		var iterator = this.entries();
		var result = iterator.next();
		while (result.done === false) {
			callbackFn.call(thisArg, result.value[1], result.value[0], this);
			result = iterator.next();
		}
	};
	Map.prototype['constructor'] =
	Map.prototype[Symbol.species] = Map;

	Map.length = 0;

	// Export the object
	global.Map = Map;

}(this));
