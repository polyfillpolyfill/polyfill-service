Element.prototype.cloneNode = (function(nativeFunc, undefined) {
	return function(deep) {
		if (deep === undefined) {
			deep = false;
		}
		var clone = nativeFunc.call(this, deep);

		if ('checked' in this) clone.checked = this.checked;

		return clone;
	};
}(Element.prototype.cloneNode));
