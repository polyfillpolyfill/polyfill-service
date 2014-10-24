(function (originalDOMTokenList, splice) {
	Object.defineProperty(HTMLElement.prototype, 'classList', {
		get: function () {
			function pull() {
				splice.apply(classList, [0, classList.length].concat((element.className || '').replace(/^\s+|\s+$/g, '').split(/\s+/)));
			}

			function push() {
				element.className = original.toString.call(classList);
			}

			var
			element = this,
			original = originalDOMTokenList.prototype,
			ClassList = function DOMTokenList() {},
			classList;

			ClassList.prototype = new originalDOMTokenList;

			ClassList.prototype.item = function item(index) {
				return pull(), original.item.apply(classList, arguments);
			};

			ClassList.prototype.toString = function toString() {
				return pull(), original.toString.apply(classList, arguments);
			};

			ClassList.prototype.add = function add() {
				return pull(), original.add.apply(classList, arguments), push();
			};

			ClassList.prototype.contains = function contains(token) {
				return pull(), original.contains.apply(classList, arguments);
			};

			ClassList.prototype.remove = function remove() {
				return pull(), original.remove.apply(classList, arguments), push();
			};

			ClassList.prototype.toggle = function toggle(token) {
				return pull(), token = original.toggle.apply(classList, arguments), push(), token;
			};

			classList = new ClassList;

			if (element.attachEvent) {
				element.attachEvent('onpropertychange', pull);
			}

			return classList;
		}
	});
})(window.DOMTokenList, Array.prototype.splice);
