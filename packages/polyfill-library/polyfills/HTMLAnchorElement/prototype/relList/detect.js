'document' in this && 'HTMLAnchorElement' in this && 'relList' in HTMLAnchorElement.prototype && (function () {
	var e = document.createElement('a');
	e.relList.add('a', 'b');
	return e.relList.contains('b');
}())
