'Set' in this && (function () {
	var s = new Set([1, 2]);
		if (s.size === 2) {
			if ('Symbol' in this && 'iterator' in Symbol && typeof s[Symbol.iterator] === 'function') {
				return true;
			}
		}
		return false;
}())
