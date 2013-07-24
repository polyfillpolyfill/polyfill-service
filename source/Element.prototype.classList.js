// Element.prototype.classList
Object.defineProperty(Element.prototype, 'classList', {
	get: function () {
		var element = this, DOMTokenList = function DOMTokenList() {
			this._element = element;
		}, array = String(element.className).trim().split(/\s+/), list;

		DOMTokenList.prototype = window.DOMTokenList.prototype;

		list = new DOMTokenList();

		Array.prototype.splice.apply(list, [0, list.length].concat(array[0] ? array : []));

		return Object.defineProperties(element, {
			className: {
				get: function () {
					return element.getAttribute('class') || '';
				},
				set: function (name) {
					var array = name !== undefined && name !== null && String(name).trim().split(/\s+/) || [];

					Array.prototype.splice.apply(list, [0, list.length].concat(array[0] ? array : []));

					element.setAttribute('class', list.toString());
				}
			},
			classList: {
				get: function () {
					return list;
				}
			}
		}).classList;
	}
});