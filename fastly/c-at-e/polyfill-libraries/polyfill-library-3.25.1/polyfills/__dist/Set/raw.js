
// Set
(function(global) {


	// Deleted map items mess with iterator pointers, so rather than removing them mark them as deleted. Can't use undefined or null since those both valid keys so use a private symbol.
	var undefMarker = Symbol('undef');

	// NaN cannot be found in an array using indexOf, so we encode NaNs using a private symbol.
	var NaNMarker = Symbol('NaN');

	function encodeVal(data) {
		return Number.isNaN(data) ? NaNMarker : data;
	}
	function decodeVal(encodedData) {
		return (encodedData === NaNMarker) ? NaN : encodedData;
	}

	function makeIterator(setInst, getter) {
		var nextIdx = 0;
		return {
			next: function() {
				while (setInst._values[nextIdx] === undefMarker) nextIdx++;
				if (nextIdx === setInst._values.length) {
					return {value: void 0, done: true};
				}
				else {
					return {value: getter.call(setInst, nextIdx++), done: false};
				}
			}
		};
	}

	var Set = function Set() {
		var data = arguments[0];
		this._values = [];
		this.size = this._size = 0;

		// If `data` is iterable (indicated by presence of a forEach method), pre-populate the set
		data && (typeof data.forEach === 'function') && data.forEach(function (item) {
			this.add.call(this, item);
		}, this);
	};

	// Some old engines do not support ES5 getters/setters.  Since Set only requires these for the size property, we can fall back to setting the size property statically each time the size of the set changes.
	try {
		Object.defineProperty(Set.prototype, 'size', {
			get: function() {
				return this._size;
			}
		});
	} catch(e) {
	}

	Set.prototype['add'] = function(value) {
		value = encodeVal(value);
		if (this._values.indexOf(value) === -1) {
			this._values.push(value);
			this.size = ++this._size;
		}
		return this;
	};
	Set.prototype['has'] = function(value) {
		return (this._values.indexOf(encodeVal(value)) !== -1);
	};
	Set.prototype['delete'] = function(value) {
		var idx = this._values.indexOf(encodeVal(value));
		if (idx === -1) return false;
		this._values[idx] = undefMarker;
		this.size = --this._size;
		return true;
	};
	Set.prototype['clear'] = function() {
		this._values = [];
		this.size = this._size = 0;
	};
	Set.prototype[Symbol.iterator] =
	Set.prototype['values'] =
	Set.prototype['keys'] = function() {
		var iterator = makeIterator(this, function(i) { return decodeVal(this._values[i]); });
		iterator[Symbol.iterator] = this.keys.bind(this);
		return iterator;
	};
	Set.prototype['entries'] = function() {
		var iterator = makeIterator(this, function(i) { return [decodeVal(this._values[i]), decodeVal(this._values[i])]; });
		iterator[Symbol.iterator] = this.entries.bind(this);
		return iterator;
	};
	Set.prototype['forEach'] = function(callbackFn, thisArg) {
		thisArg = thisArg || global;
		var iterator = this.entries();
		var result = iterator.next();
		while (result.done === false) {
			callbackFn.call(thisArg, result.value[1], result.value[0], this);
			result = iterator.next();
		}
	};
	Set.prototype['constructor'] =
	Set.prototype[Symbol.species] = Set;

	Set.prototype.constructor = Set;
	Set.name = "Set";

	// Export the object
	global.Set = Set;

}(this));
