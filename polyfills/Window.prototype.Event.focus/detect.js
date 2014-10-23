(function(support, html, a) {
	function onfocusin() {
		support = true;
	}

	a.href = '#';

	if ('addEventListener' in a) {
		a.addEventListener('focusin', onfocusin);
	} else {
		a.attachEvent('onfocusin', onfocusin);
	}

	html.appendChild(a).focus();

	html.removeChild(a);

	return support;
})(false, document.documentElement, document.createElement('a'))
