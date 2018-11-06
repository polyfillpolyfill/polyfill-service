'document' in this && 'HTMLAnchorElement' in this && 'relList' in HTMLAnchorElement.prototype && (function () {
	var e = document.createElement('a');
	e.rel = 'a a b';
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
