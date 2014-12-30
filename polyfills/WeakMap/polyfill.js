(function() {
	var defineProperty = Object.defineProperty;
	var counter = Date.now() % 1e9;

	var WeakMap = function(data) {
		var i, s;
		this.name = '__st' + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
		if (data && data.length) {
			for (i=0, s=data.length; i<s; i++) {
				if (typeof data[i] === 'object' && data[i].length) {
					if (typeof data[i][0] === 'object' || typeof data[i][0] === 'function') {
						this.set(data[i][0], data[i][1]);
					} else {
						throw new TypeError('Invalid value used as weak map key');
					}
				} else {
					throw new TypeError('Iterator value '+data[i]+' is not an entry object');
				}
			}
		}
	};

	WeakMap.prototype["set"] = function(key, value) {
		var entry = key[this.name];
		if (entry && entry[0] === key)
			entry[1] = value;
		else
			defineProperty(key, this.name, {value: [key, value], writable: true});
		return this;
	};
	WeakMap.prototype["get"] = function(key) {
		var entry;
		return (entry = key[this.name]) && entry[0] === key ?
				entry[1] : undefined;
	};
	WeakMap.prototype["delete"] = function(key) {
		var entry = key[this.name];
		if (!entry || entry[0] !== key) return false;
		entry[0] = entry[1] = undefined;
		return true;
	};
	WeakMap.prototype["has"] = function(key) {
		var entry = key[this.name];
		if (!entry) return false;
		return entry[0] === key;
	};

	window.WeakMap = WeakMap;
})();
