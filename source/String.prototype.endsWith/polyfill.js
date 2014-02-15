// String.prototype.endsWith
String.prototype.endsWith = function endsWith(searchString, position) {
	var
	string = this.slice(position || 0);

	return string.indexOf(searchString, string.length - searchString.length) !== -1;
};
