(function (originalDOMTokenList, splice) {
	Object.defineProperty(HTMLElement.prototype, 'classList', {
		get: function () {
			function pull(self) {
				splice.apply(self, [0, self.length].concat((element.className || '').replace(/^\s+|\s+$/g, '').split(/\s+/)));
			}

			function push(self) {
				element.className = original.toString.call(self);
			}

			var
			element = this,
			original = originalDOMTokenList.prototype,
			ClassList = function DOMTokenList() {},
			prototype = {
				item: function item(index) {
					return pull(this), original.item.call(this, index);
				},
				toString: function toString() {
					return pull(this), original.toString.apply(this);
				},
				add: function add() {
					return pull(this), original.add.apply(this, arguments), push(this);
				},
				contains: function contains(token) {
					return pull(this), original.contains.call(this, token);
				},
				remove: function remove() {
					return pull(this), original.remove.apply(this, arguments), push(this);
				},
				toggle: function toggle(token) {
					return pull(this), token = original.toggle.call(this, token), push(this), token;
				}
			},
			key;

			ClassList.prototype = new originalDOMTokenList;

			for (key in prototype) {
				ClassList.prototype[key] = prototype[key];
			}

			return new ClassList;
		}
	});
})(window.DOMTokenList, Array.prototype.splice);
