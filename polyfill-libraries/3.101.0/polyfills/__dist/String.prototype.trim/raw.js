
// String.prototype.trim
/* global CreateMethodProperty, TrimString */
// 21.1.3.27. String.prototype.trim ( )
CreateMethodProperty(String.prototype, 'trim', function trim() {
	'use strict';
	// Let S be this value.
	var S = this;
	// Return ? TrimString(S, "start+end").
	return TrimString(S, "start+end");
});
