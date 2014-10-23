(function (slice) {
	Array.of = function of() {
		return slice.call(arguments);
	};
})(Array.prototype.slice);
