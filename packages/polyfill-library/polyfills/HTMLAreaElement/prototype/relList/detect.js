'document' in this && 'HTMLAreaElement' in this && 'relList' in HTMLAreaElement.prototype && (function () {
	var e = document.createElement('area');
	e.relList.add('a', 'b');
	return e.relList.contains('b');
}())
