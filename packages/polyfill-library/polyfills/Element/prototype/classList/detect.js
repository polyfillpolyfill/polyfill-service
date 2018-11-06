'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && (function () {
	var e = document.createElement('span');
	e.className = 'a a b';
	if (e.classList.length === 2) {
		e.classList.add('a', 'b');
		if ('replace' in e.classList) {
			e.classList.replace('b', 'c');
			return e.classList.contains('c');
		} else {
			return false;
		}
	} else {
		return false;
	}
}())
