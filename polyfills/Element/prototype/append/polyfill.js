Document.prototype.append = Element.prototype.append = DocumentFragment.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};
