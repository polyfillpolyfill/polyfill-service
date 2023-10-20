
// String.prototype.padStart
(function () {
	Object.defineProperty(String.prototype, 'padStart', {
		configurable: true,
		enumerable: false,
		value: function padStart (targetLength) {
			targetLength = targetLength | 0;
			if (targetLength <= this.length) return String(this);
			var padString = String(arguments[1] || " ");
			var repeat = Math.ceil((targetLength - this.length) / padString.length);
			while (repeat--) {
				padString += padString;
			}
			return padString.substr(0, targetLength - this.length) + String(this);
		},
		writable: true
	});
}());
