(function (global) {
	var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

	if (!nativeImpl) {
		global.DOMTokenList = _DOMTokenList;
	} else {
		var NativeToggle = nativeImpl.prototype.toggle;

		nativeImpl.prototype.toggle = function toggle(token) {
			if (1 in arguments) {
				var contains = this.contains(token);
				var force = !!arguments[1];

				if ((contains && force) || (!contains && !force)) {
					return force;
				}
			}

			return NativeToggle.call(this, token);
		};

	}

}(this));
