(function() {
	if (!("WeakSet" in window)) return false;
	var o = {};
	var ws = new WeakSet([o]);
	return (!!wm.has(o));
}())
