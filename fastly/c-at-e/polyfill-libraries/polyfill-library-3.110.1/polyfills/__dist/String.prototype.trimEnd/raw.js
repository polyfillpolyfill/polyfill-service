
// String.prototype.trimEnd
/* global CreateMethodProperty, TrimString */
// 21.1.3.28 String.prototype.trimEnd ( )
CreateMethodProperty(String.prototype, 'trimEnd', function trimEnd() {
	'use strict';
	// 1. Let S be this value.
	var S = this;
	// 2. Return ? TrimString(S, "end").
	return TrimString(S, "end");
});
