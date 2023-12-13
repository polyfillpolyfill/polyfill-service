
// Element.prototype.append
/* global _mutation */
Document.prototype.append = Element.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};
