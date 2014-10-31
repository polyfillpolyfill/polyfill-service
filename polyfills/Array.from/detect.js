Array.from && (function () {
	try {
		Array.from({ length: -Infinity });

		return true;
	} catch (e) {
		return false;
	}
})()
