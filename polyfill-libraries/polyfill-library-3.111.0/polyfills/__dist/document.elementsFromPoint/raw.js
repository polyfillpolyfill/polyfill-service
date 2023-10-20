
// document.elementsFromPoint
document.elementsFromPoint = function elementsFromPoint(x, y) {
	if ('msElementsFromPoint' in this) {
		return this.msElementsFromPoint(x, y) || [];
	}

	var stack = [];
	var element = document.elementFromPoint(x, y);

	// IE8 and IE9 don't have support for pointer-events for html elements
	var isIE =  (/msie|trident/i).test(navigator && navigator.userAgent);
	// CSS property used to exclude the element from hit testing
	var propertyName = isIE
		? 'visibility'
		: 'pointer-events';
	var propertyValue = isIE
		? 'hidden'
		: 'none';

	function setProperty(element, name, value, priority) {
		if (element.style.setProperty) {
			// on IE9 it needs to be cleared out before changing visibility from hidden to visibile
			element.style.setProperty(name, '', '');
			element.style.setProperty(name, value, priority);
		} else {
			element.style[name] = value;
			// need to force a reflow on IE8 in some cases
			element.getClientRects();
		}
	}

	function getPropertyValue(element, name) {
		if (element.style.getPropertyValue) {
			return element.style.getPropertyValue(name);
		} else {
			return element.style[name]
		}
	}

	function getPropertyPriority(element, name) {
		if (element.style.getPropertyPriority)
			return element.style.getPropertyPriority(name);
	}

	while (element !== null) {
		stack.push({
			element: element,
			value: getPropertyValue(element, propertyName),
			priority: getPropertyPriority(element, propertyName)
		});
		/**
		* [...]Note: The elementFromPoint() method does not necessarily return the top-most painted element.
		* For instance, an element can be excluded from being a target for hit testing by using the pointer-events
		* CSS property.[...]
		* https://drafts.csswg.org/cssom-view/#dom-document-elementfrompoint
		*/
		setProperty(element, propertyName, propertyValue, 'important');

		element = element !== document.documentElement
			? document.elementFromPoint(x, y)
			: null;
	}

	return stack.map(function (entry) {
		// restore its previous value if any
		setProperty(entry.element, propertyName, entry.value, entry.priority);

		return entry.element;
	});
};
