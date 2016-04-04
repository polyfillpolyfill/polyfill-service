(function(global) {

	var Map = function(data) {
		var keys, values;

		// If `data` is iterable (indicated by presence of a forEach method), pre-populate the map
		data && data.forEach && data.forEach(function (item) {
			this.set.apply(this, item);
		}, this);
	};

	Object.assign(Map.prototype, {
		"get": function(key) {
			var idx = this.keys.indexOf(key);
			return (idx !== -1) ? this.values[idx] : undefined;
		},
		"set": function(key, value) {
			if (typeof key !== 'object' && typeof key !== 'function')
				throw new TypeError('Invalid value used as weak map key');

			var entry = key[this.name];
			if (entry && entry[0] === key)
				entry[1] = value;
			else
				defineProperty(key, this.name, {value: [key, value], writable: true});
			return this;
		},
		"has": function(key) {
			return (this.keys.indexOf(key) !== -1);
		},
		"delete": function(key) {
			var idx = this.keys.indexOf(key);
			if (idx === -1) return false;
			this.keys.splice(idx);
			this.values.splice(idx);
			return true;
		},
		"clear": function() {
			this.keys = this.values = [];
		},
		get "size": function() {
			return this.keys.length;
		},
		"values": function() {

		},
		"keys": function() {

		},
		"entries": function() {
			// TODO
		},
		"forEach": function() {

		},
		"constructor": Map
	});

	Map.length = 0;

	// TODO: get Map[@@species]

	// Export the object
	this.Map = Map;

})(this);
