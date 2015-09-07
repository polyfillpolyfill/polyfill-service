Document.prototype.prepend = Element.prototype.prepend = function prepend() {
	this.insertBefore(_mutation(arguments), this.firstChild);
};
