window.DOMTokenList && (function (x) {
	x.classList.toggle('x', false);

	return !x.className;
})(document.createElement('x'))