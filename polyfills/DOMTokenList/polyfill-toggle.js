(function (DOMTokenListPrototype) {
	var NativeToggle = DOMTokenListPrototype.toggle;

	DOMTokenListPrototype.toggle = function toggle(token) {
		if (1 in arguments) {
			var
			contains = this.contains(token),
			force = !!arguments[1];

			if ((contains && force) || (!contains && !force)) {
				return force;
			}
		}

		return NativeToggle.call(this, token);
	};
})(DOMTokenList.prototype);
