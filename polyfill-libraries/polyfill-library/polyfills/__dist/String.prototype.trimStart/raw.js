
// String.prototype.trimStart
/* global CreateMethodProperty, TrimString */
// 21.1.3.29 String.prototype.trimStart ( )
CreateMethodProperty(String.prototype, 'trimStart', function trimStart() {
	'use strict';
	// 1. Let S be this value.
	var S = this;
	// 2. Return ? TrimString(S, "start").
	return TrimString(S, "start");
});
