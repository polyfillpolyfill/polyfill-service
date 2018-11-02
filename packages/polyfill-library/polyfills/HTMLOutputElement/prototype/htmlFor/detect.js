'document' in this && 'HTMLOutputElement' in this && 'htmlFor' in HTMLOutputElement.prototype && (function () {
	var e = document.createElement('output');
	e.htmlFor.add('a', 'b');
	return e.htmlFor.contains('b');
}())
