// Window.prototype.DOMTokenList
(function () {
	function spliceClassList(classList) {
		Array.prototype.splice.call(classList, 0, classList.length);

		if (classList.element.className.trim()) {
			Array.prototype.push.apply(classList, classList.element.className.trim().split(/\s+/));
		}

		return classList;
	}

	function getStringTokenIndex(classList, token) {
		if (/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/.test(token)) {
			return Array.prototype.indexOf.call(classList, token);
		} else {
			throw new Error('InvalidCharacterError: DOM Exception 5');
		}
	}

	var DOMTokenList = window.DOMTokenList = Window.prototype.DOMTokenList = function DOMTokenList() {
		throw new Error('Illegal constructor');
	};

	DOMTokenList.prototype = {
		constructor: DOMTokenList,
		'length': Array.prototype.length,
		'item': function () {
			return spliceClassList(this)[arguments[0]] || null;
		},
		'contains': function () {
			return getStringTokenIndex(spliceClassList(this), String(arguments[0])) !== -1;
		},
		'add': function () {
			var token = String(arguments[0]);

			if (getStringTokenIndex(spliceClassList(this), token) === -1) {
				Array.prototype.push.call(this, token);

				this.element.setAttribute('class', Array.prototype.join.call(this, ' '));
			}
		},
		'remove': function () {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(spliceClassList(this), token);

			if (index !== -1) {
				Array.prototype.splice.call(this, index, 1);

				this.element.setAttribute('class', Array.prototype.join.call(this, ' '));
			}
		},
		'toggle': function () {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(spliceClassList(this), token),
			hasnt = index === -1;

			if (hasnt) {
				Array.prototype.push.call(this, token);
			} else {
				Array.prototype.splice.call(this, index, 1);
			}

			this.element.setAttribute('class', Array.prototype.join.call(this, ' '));

			return hasnt;
		},
		'toString': function () {
			return spliceClassList(this).element.getAttribute('class');
		}
	};
})();
