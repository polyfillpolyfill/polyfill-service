(function(global) {
	try {
		if ("WeakSet" in global && WeakSet.length === 0) {
			var o = {};
			var ws = new WeakSet([o]);
			return (ws.has(o) && ws["delete"](0) === false);
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}(this))
