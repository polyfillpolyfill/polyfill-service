
// DOMTokenList.prototype.@@iterator
/* global ArrayIterator */
(function (global) {
	global.DOMTokenList.prototype[global.Symbol.iterator] = function () {
		return new ArrayIterator(this);
	};

	var e = document.createElement('span');
	if (
		e.classList &&
		e.classList.constructor &&
		e.classList.constructor.prototype &&
		!e.classList.constructor.prototype[global.Symbol.iterator]
	) {
		e.classList.constructor.prototype[global.Symbol.iterator] = function () {
			return new ArrayIterator(this);
		}
	}
}(self));
