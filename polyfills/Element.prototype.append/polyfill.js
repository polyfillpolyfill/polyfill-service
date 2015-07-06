Document.prototype.prepend = Element.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};
