'document' in this && 'HTMLLinkElement' in this && 'relList' in HTMLLinkElement.prototype && (function () {
	var e = document.createElement('link');
	e.relList.add('a', 'b');
	return e.relList.contains('b');
}())
