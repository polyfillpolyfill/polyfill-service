// Primitive detect for HTML5 element support - add a <section> element and check that it acquires block display mode by default
(function() {
	var p = document.createElement('p');
	var result = false;
	p.innerHTML = '<section></section>';
	document.documentElement.appendChild(p);
	if (p.firstChild) {
		if ('getComputedStyle' in window) {
			result = (getComputedStyle(p.firstChild).display === 'block');
		} else if (p.firstChild.currentStyle) {
			result = (p.firstChild.currentStyle.display === 'block');
		}
	}
	document.documentElement.removeChild(p);
	return result;
})()
