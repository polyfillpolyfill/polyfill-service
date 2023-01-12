
// Array.prototype.flatMap
/* global CreateMethodProperty, ToObject, ToLength, Get, IsCallable, ArraySpeciesCreate, FlattenIntoArray */
// 22.1.3.11 Array.prototype.flatMap ( mapperFunction [ , thisArg ] )
CreateMethodProperty(Array.prototype, 'flatMap', function flatMap(mapperFunction /* , thisArg */ ) {
	"use strict";
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Let sourceLen be ? ToLength(? Get(O, "length")).
	var sourceLen = ToLength(Get(O, "length"));
	// 3. If IsCallable(mapperFunction) is false, throw a TypeError exception.
	if (IsCallable(mapperFunction) === false) {
		throw new TypeError('mapperFunction is not callable.');
	}
	// 4. If thisArg is present, let T be thisArg; else let T be undefined.
	var T;
	if (1 in arguments) {
		T = arguments[1];
	} else {
		T = undefined;
	}
	// 5. Let A be ? ArraySpeciesCreate(O, 0).
	var A = ArraySpeciesCreate(O, 0);
	// 6. Perform ? FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, T).
	FlattenIntoArray(A, O, sourceLen, 0, 1, mapperFunction, T);
	// 7. Return A.
	return A;
});
