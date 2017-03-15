String.prototype.padEnd = function (targetLength, padString) {
	targetLength = targetLength | 0;
	if (targetLength <= this.length) return String(this);
	padString = String(padString || " ");
	var repeat = Math.ceil((targetLength - this.length) / padString.length);
	while (repeat--) {
		padString += padString;
	}
	return String(this) + padString.substr(0, targetLength - this.length);
};
