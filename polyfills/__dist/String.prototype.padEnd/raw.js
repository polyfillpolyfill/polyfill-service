
// String.prototype.padEnd
(function () {
	Object.defineProperty(String.prototype, 'padEnd', {
		configurable: true,
		enumerable: false,
		value: function padEnd (targetLength) {
			targetLength = targetLength | 0;
			if (targetLength <= this.length) return String(this);
			var padString = String(arguments[1] || " ");
			var repeat = Math.ceil((targetLength - this.length) / padString.length);
			while (repeat--) {
				padString += padString;
			}
			return String(this) + padString.substr(0, targetLength - this.length);
		},
		writable: true
	});
}());
