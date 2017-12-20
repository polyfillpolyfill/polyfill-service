'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && (function () {
	var e = document.createElement('span');
	e.classList.add('a', 'b');
	return e.classList.contains('b');
}())
