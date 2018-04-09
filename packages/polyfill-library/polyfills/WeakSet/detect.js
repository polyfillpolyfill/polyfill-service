(function(global) {
	if (!("WeakSet" in global)) return false;
	var o = {};
	var ws = new WeakSet([o]);
	return (!!ws.has(o));
}(this))
