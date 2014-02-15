// String.prototype.startsWith
String.prototype.startsWith = function startsWith(searchString, position) {
	return this.slice(position || 0).indexOf(searchString) === 0;
};
