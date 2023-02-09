
// Array.prototype.flat
/* global CreateMethodProperty, ToObject, ToLength, Get, ToInteger, ArraySpeciesCreate, FlattenIntoArray */
// 22.1.3.10 Array.prototype.flat( [ depth ] )
CreateMethodProperty(Array.prototype, 'flat', function flat() {
	"use strict";
	var depth = arguments[0];
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let sourceLen be ? ToLength(? Get(O, "length")).
	var sourceLen = ToLength(Get(O, "length"));
	// 3. Let depthNum be 1.
	var depthNum = 1;
	// 4. If depth is not undefined, then
	if (depth !== void 0) {
		// a. Set depthNum to ? ToInteger(depth).
		depthNum = ToInteger(depth);
	}
	// 5. Let A be ? ArraySpeciesCreate(O, 0).
	var A = ArraySpeciesCreate(O,0);
	// 6. Perform ? FlattenIntoArray(A, O, sourceLen, 0, depthNum).
	FlattenIntoArray(A, O, sourceLen, 0, depthNum);
	// 7. Return A.
	return A;
});
