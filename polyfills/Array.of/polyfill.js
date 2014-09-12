// Array.of
Array.of = function of() {
	return Array.prototype.slice.call(arguments);
};
