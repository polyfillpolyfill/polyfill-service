// Element.prototype.matches, Element.prototype.matchesSelector
Element.prototype.matches = function matches(selector) {
	var
	element = this,
	elements = (element.document || element.ownerDocument).querySelectorAll(selector),
	index = 0;

	while (elements[index] && elements[index] !== element) {
		++index;
	}

	return elements[index] ? true : false;
};
