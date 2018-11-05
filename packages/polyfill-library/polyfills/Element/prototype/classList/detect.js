'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && (function () {
	var e = document.createElement('span');
	e.classList.add('a', 'b');
	if ('replace' in e.classList) {
		e.classList.replace('b', 'c');
		return e.classList.contains('c');
	} else {
		return false;
	}
}())
