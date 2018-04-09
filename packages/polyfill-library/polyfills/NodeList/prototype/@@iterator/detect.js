'Symbol' in this && 'iterator' in this.Symbol && (function () {
	var fragment = document.createDocumentFragment();
	fragment.appendChild(document.createElement('div'));
	return !!fragment.childNodes[Symbol.iterator];
})()
