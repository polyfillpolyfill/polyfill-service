(function (window) {
	'use strict';
	function addProp(constructor, name, attr) {
		var spaces = /\s+/;
		if (constructor && !(name in constructor.prototype)) {
			Object.defineProperty(constructor.prototype, name, {
				get: function () {
					return new DOMTokenList(this, attr);
				},
				set:  function (value) {
					var domList = new DOMTokenList(this, attr);
					var values = value.split(spaces);
					for (var i = 0; i < values.length; i++) {
						domList.add(values[i]);
					}
					return domList;
				}
			});
		}
	}

	/*
		The DOMTokenList interface represents a set of space-separated tokens.
		Such a set is returned by 
			Element.classList, 
			HTMLLinkElement.relList, 
			HTMLAnchorElement.relList, 
			HTMLAreaElement.relList, 
			HTMLIframeElement.sandbox, 
			or HTMLOutputElement.htmlFor. 
		It is indexed beginning with 0 as with JavaScript Array objects. DOMTokenList is always case-sensitive.
	*/
	addProp(window.HTMLOutputElement, "htmlFor", "for");
}(window));
