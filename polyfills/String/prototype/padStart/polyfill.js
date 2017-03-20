(function () {
	Object.defineProperty(String.prototype, 'padStart', {
		configurable: true,
		enumerable: false,
		value: function padStart (targetLength, padString) {
			targetLength = targetLength | 0;
			if (targetLength <= this.length) return String(this);
			padString = String(padString || " ");
			var repeat = Math.ceil((targetLength - this.length) / padString.length);
			while (repeat--) {
				padString += padString;
			}
			return padString.substr(0, targetLength - this.length) + String(this);
		},
		writable: true
	})
}())
