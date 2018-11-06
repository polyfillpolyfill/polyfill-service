var _addDOMTokenListProperty = (function () { // eslint-disable-line no-unused-vars
    var spaces = /\s+/;
	return function (constructor, name, attr) {
		"use strict";
		try {
			Object.defineProperty(constructor.prototype, name, {
				get: function () {
					return new DOMTokenList(this, attr);
				},
				set: function (value) {
					var domList = new DOMTokenList(this, attr);
					var values = value.split(spaces);
					for (var i = 0; i < values.length; i++) {
						domList.add(values[i]);
					}
					return domList;
				}
			});
		} catch (err) {
			// Polyfill.io - Safari 9 does not allow configuring of the Element.prototype.classList descriptor
		}
	};
}());
