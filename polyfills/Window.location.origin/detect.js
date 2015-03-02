(function(global) {
	'use strict';

	try {
		if (global.window) {
			return window.location.origin
		}
	}
	catch (error) { }
}(this))
