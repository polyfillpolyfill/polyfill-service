'document' in this && "classList" in document.documentElement && (function () {
	var e = document.createElement('span');
	e.classList.add('a', 'b');
	return e.classList.contains('b');
}())
