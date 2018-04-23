Element.prototype.cloneNode = (function(nativeFunc, undef) {
	return function(deep) {
		if (deep === undef) {
			deep = false;
		}
		var clone = nativeFunc.call(this, deep);

		if ('checked' in this) clone.checked = this.checked;

		return clone;
	};
}(Element.prototype.cloneNode));
