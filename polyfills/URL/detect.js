(function (global) {
	/*
	 * Browsers may have:
	 * No global URL object
	 * URL with static methods only - may have a dummy constructor
	 * URL with members except searchParams
	 * Full URL API support
	 */
	'use strict';

	try {
		if (global.URL) {
			var nativeURL = new global.URL('http://example.com');

			if ('href' in nativeURL && 'searchParams' in nativeURL) {
				return nativeURL;
			}
		}
	}
	catch (error) { }
}(this))
