
// String.prototype.repeat
String.prototype.repeat = function repeat(count) {
	'use strict';

	if (this === undefined || this === null) {
		throw new TypeError(this + ' is not an object');
	}

	if (count < 0 || count === Infinity) {
		throw new RangeError(count + ' is less than zero or equal to infinity');
	}

	return new Array((parseInt(count, 10) || 0) + 1).join(this);
};
