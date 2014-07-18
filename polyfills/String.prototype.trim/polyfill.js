// String.prototype.trim
String.prototype.trim = function trim() {
	return this.replace(/^\s+|\s+$/g, '');
};
