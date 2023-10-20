
// DocumentFragment.prototype.prepend
/* global _mutation */
DocumentFragment.prototype.prepend = function prepend() {
	this.insertBefore(_mutation(arguments), this.firstChild);
};
