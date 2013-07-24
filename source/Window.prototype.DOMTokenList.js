// Window.prototype.DOMTokenList
(function () {
	function getStringTokenIndex(list, token) {
		if (validator.test(token)) {
			return Array.prototype.indexOf.call(list, token);
		} else {
			throw new Error('InvalidCharacterError: DOM Exception 5');
		}
	}

	var DOMTokenList = window.DOMTokenList = Window.prototype.DOMTokenList = function DOMTokenList() {
		throw new Error('Illegal constructor');
	},
	validator = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;

	DOMTokenList.prototype = {
		constructor: DOMTokenList,
		length: Array.prototype.length,
		item: function item(index) {
			return this[parseFloat(index)];
		},
		contains: function contains() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			return index !== -1;
		},
		add: function add() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			if (index === -1) {
				Array.prototype.push.call(this, token);

				this._element.setAttribute('class', this.toString());
			}
		},
		remove: function remove() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			if (index !== -1) {
				Array.prototype.splice.call(this, index, 1);

				this._element.setAttribute('class', this.toString());
			}
		},
		toggle: function toggle() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			if (index === -1) {
				Array.prototype.push.call(this, token);
			} else {
				Array.prototype.splice.call(this, index, 1);
			}

			this._element.setAttribute('class', this.toString());
		},
		toString: function () {
			return Array.prototype.join.call(this, ' ');
		}
	};
})();