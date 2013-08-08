(function (window) {
	'use strict';

	var
	Array = window.Array,
	array = new Array(),
	Date = window.Date,
	date = new Date(),
	Object = window.Object,
	string = new String(),
	textarea = document.createElement('textarea'),
	key;

	var supported = {
		// Object
		Object_create: 'create' in Object || ('onpropertychange' in textarea),
		Object_create_ie7: 'create' in Object || !('onpropertychange' in textarea),
		Object_defineProperty: 'defineProperty' in Object || ('onpropertychange' in textarea),
		Object_defineProperty_ie7: 'defineProperty' in Object || !('onpropertychange' in textarea),
		Object_defineProperties: 'defineProperties' in Object,
		Object_getOwnPropertyNames: 'getOwnPropertyNames' in Object,
		Object_getPrototypeOf: 'getPrototypeOf' in Object,
		Object_is: 'is' in Object,
		Object_keys: 'keys' in Object,

		// Function
		Function__bind: 'bind' in Function.prototype,

		// Array
		Array_isArray: 'isArray' in Array,
		Array__map: 'map' in array,
		Array__some: 'some' in array,
		Array__every: 'every' in array,
		Array__filter: 'filter' in array,
		Array__forEach: 'forEach' in array,
		Array__reduce: 'reduce' in array,
		Array__reduceRight: 'reduceRight' in array,
		Array__indexOf: 'indexOf' in array,
		Array__lastIndexOf: 'lastIndexOf' in array,

		// Date
		Date_now: 'now' in Date,
		Date__toISOString: 'toISOString' in date,

		// String
		String__trim: 'trim' in string,

		// Window
		Window__base64: 'atob' in window,
		Window__DOMTokenList: 'DOMTokenList' in window,
		Window__Event: 'Event' in window || 'createEventObject' in document,
		Window__Event_ie8: 'Event' in window || !('createEventObject' in document),
		Window__Event_ie8_DOMContentLoaded: 'Event' in window || !('createEventObject' in document),
		Window__Event_hashchange: 'onhashchange' in window,
		Window__getComputedStyle_ie8: 'getComputedStyle' in window || !('currentStyle' in textarea),
		Window__matchMedia: 'matchMedia' in window,
		Window__viewport: true,

		// Geolocation
		Navigator__geolocation: 'geolocation' in navigator,

		// HTMLDocument
		HTMLDocument__head: 'head' in document,

		// Element
		Element__classList: 'classList' in textarea,
		Element__matches: 'matches' in textarea || 'msMatchesSelector' in textarea || 'mozMatchesSelector' in textarea || 'oMatchesSelector' in textarea || 'webkitMatchesSelector' in textarea,
		Element__matches_ms: 'matches' in textarea || !('msMatchesSelector' in textarea),
		Element__matches_moz: 'matches' in textarea || !('mozMatchesSelector' in textarea),
		Element__matches_o: 'matches' in textarea || !('oMatchesSelector' in textarea),
		Element__matches_webkit: 'matches' in textarea || !('webkitMatchesSelector' in textarea),
		Element__mutation: 'after' in textarea || 'remove' in textarea,
		Element__mutation_blink: 'after' in textarea || !('remove' in textarea),
		Element__placeholder: 'placeholder' in document.createElement('textarea')
	};

	for (key in supported) {
		if (!supported[key]) {
			array.push(key);
		}
	}

	document.write('<' + 'script src="//polyfill.io/?' + array.join() + '"></script>')
})(this);