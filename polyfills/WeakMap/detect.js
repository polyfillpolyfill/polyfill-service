(function() {
	if (!("WeakMap" in window)) return false;
	var o = {};
	var wm = new WeakMap([[o, 'test']]);
	return (wm.get(o) === 'test');
}())
