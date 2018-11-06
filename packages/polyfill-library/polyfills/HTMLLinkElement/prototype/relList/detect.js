'document' in this && 'HTMLLinkElement' in this && 'relList' in HTMLLinkElement.prototype && (function () {
	var e = document.createElement('link');
	e.setAttribute('rel', 'a a b');
	if (e.relList.length === 2) {
		e.relList.add('a', 'b');
		if ('replace' in e.relList) {
			e.relList.replace('b', 'c');
			return e.relList.contains('c');
		} else {
			return false;
		}
	} else {
		return false;
	}
}())
