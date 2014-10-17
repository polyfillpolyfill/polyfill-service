Function.prototype.bind = function bind(scope) {
	var
	callback = this,
	prepend = Array.prototype.slice.call(arguments, 1),
	Constructor = function () {},
	bound = function () {
		return callback.apply(
			this instanceof Constructor && scope ? this : scope,
			prepend.concat(Array.prototype.slice.call(arguments, 0))
		);
	};

	Constructor.prototype = bound.prototype = callback.prototype;

	return bound;
};
