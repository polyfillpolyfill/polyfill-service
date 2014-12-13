Element.prototype.cloneNode = (function(nativeFunc) {
	return function(deep) {
		var clone = nativeFunc.call(this, deep);

		if ('checked' in this) clone.checked = this.checked;

		return clone;
	}
})(Element.prototype.cloneNode);
