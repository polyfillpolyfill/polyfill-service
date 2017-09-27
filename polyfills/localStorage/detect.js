'localStorage' in this && (function() {
	try {
		// Needed for Safari private browsing.
		window.localStorage.setItem('storage_test', 1);
		window.localStorage.removeItem('storage_test');
		return true;
	} catch (e) {
		return false;
	}
}())
