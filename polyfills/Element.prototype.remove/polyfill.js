Document.prototype.remove = Element.prototype.remove = Text.prototype.remove = function remove() {
	if (this.parentNode) {
		this.parentNode.removeChild(this);
	}
};
