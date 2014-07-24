// Element.prototype.matches, Element.prototype.matchesSelector
Element.prototype.matches = (Element.prototype.matches ||
				Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.oMatchesSelector ||
function matches(selector) {
	var
	element = this,
	elements = (element.document || element.ownerDocument).querySelectorAll(selector),
	index = 0;

	while (elements[index] && elements[index] !== element) {
		++index;
	}

	return elements[index] ? true : false;
});
