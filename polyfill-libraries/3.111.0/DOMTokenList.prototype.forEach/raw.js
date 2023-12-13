
// DOMTokenList.prototype.forEach
(function (global) {
	global.DOMTokenList.prototype.forEach = global.Array.prototype.forEach;

	var e = document.createElement('span');
	if (
		e.classList &&
		e.classList.constructor &&
		e.classList.constructor.prototype &&
		!e.classList.constructor.prototype.forEach
	) {
		e.classList.constructor.prototype.forEach = global.Array.prototype.forEach;
	}
}(self));
