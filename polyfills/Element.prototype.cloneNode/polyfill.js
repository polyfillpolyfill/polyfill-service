Element.prototype.cloneNode = function(deep) {
	var tmp, clone;
	tmp = document.createElement('div');
	tmp.innerHTML = this.outerHTML;
	clone = tmp.firstChild;

	if ('checked' in this) clone.checked = this.checked;

	if (deep === false && clone.innerHTML) {
		clone.innerHTML = '';
	}

	return clone;
}
