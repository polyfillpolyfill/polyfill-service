'Set' in this && (function() {
	try {
		var s = new Set([1, 2]);
		if (Set.length === 0) {
			if (s.size === 2) {
				if ('Symbol' in this && 'iterator' in Symbol && typeof s[Symbol.iterator] === 'function') {
					return true;
				}
			}
		}
		return false;
	} catch (e) {
		return false;
	}
}())
