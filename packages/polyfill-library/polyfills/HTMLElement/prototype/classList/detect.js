'document' in this && 'HTMLElement' in this && 'classList' in HTMLElement.prototype && (function () {
	var e = document.createElement('span');
	e.classList.add('a', 'b');
	return e.classList.contains('b');
}())
