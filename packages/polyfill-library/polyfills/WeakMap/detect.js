(function(global) {
	try {
		if ("WeakMap" in global && WeakMap.length === 0) {
			var o = {};
			var wm = new WeakMap([[o, 'test']]);
			return (wm.get(o) === 'test' && wm["delete"](0) === false);
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}(this))
