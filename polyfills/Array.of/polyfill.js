(function (slice) {
	// Array.of
	Array.of = function of() {
		return slice.call(arguments);
	};
})(Array.prototype.slice);
