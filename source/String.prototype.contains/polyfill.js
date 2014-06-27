// String.prototype.contains
String.prototype.contains = function (string, index) {
	return this.indexOf(string, index) !== -1;
};
