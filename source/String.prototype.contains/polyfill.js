// String.prototype.contains
String.prototype.contains = function contains(searchString, position) {
	return this.indexOf(searchString, position) !== -1;
};
