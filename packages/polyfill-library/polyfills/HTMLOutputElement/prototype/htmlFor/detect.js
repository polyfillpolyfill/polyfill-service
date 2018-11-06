'document' in this && 'HTMLOutputElement' in this && 'htmlFor' in HTMLOutputElement.prototype && (function () {
	var e = document.createElement('output');
	e.setAttribute('for', 'a a b');
	if (e.htmlFor.length === 2) {
		e.htmlFor.add('a', 'b');
		if ('replace' in e.htmlFor) {
			e.htmlFor.replace('b', 'c');
			return e.htmlFor.contains('c');
		} else {
			return false;
		}
	} else {
		return false;
	}
}())
