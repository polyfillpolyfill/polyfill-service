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
		var nativeURL = new global.URL('http://example.com');

		if ('href' in nativeURL && 'searchParams' in nativeURL) {
			var url = new URL('http://example.com');
			url.search = 'a=1&b=2';
			if (url.href === 'http://example.com/?a=1&b=2') {
				url.search = '';
				if (url.href === 'http://example.com/') {
					return true;
				}
			}
		}
		return false;
	} catch (error) {
		return false;
	}
}(this))
