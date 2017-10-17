DocumentFragment.prototype.append = function append() {
	this.appendChild(_mutation(arguments));
};
