'localStorage' in this && (function() {
	try {
		// Needed for Safari private browsing.
		this.localStorage.setItem('storage_test', 1);
		this.localStorage.removeItem('storage_test');
		return true;
	} catch (e) {
		return false;
	}
}).call(this)
