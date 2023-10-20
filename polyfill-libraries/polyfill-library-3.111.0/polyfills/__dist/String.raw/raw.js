
// String.raw
/* global CreateMethodProperty, ToObject, Get, ToLength, ToString */
// 21.1.2.4String.raw ( template, ...substitutions )
CreateMethodProperty(String, "raw", function raw(template /*, ...substitutions*/ ) {
	// 1. Let substitutions be a List consisting of all of the arguments passed to this function, starting with the second argument. If fewer than two arguments were passed, the List is empty.
	var substitutions = Array.prototype.slice.call(arguments, 1);
	// 2. Let numberOfSubstitutions be the number of elements in substitutions.
	var numberOfSubstitutions = substitutions.length;
	// 3. Let cooked be ? ToObject(template).
	var cooked = ToObject(template);
	// 4. Let raw be ? ToObject(? Get(cooked, "raw")).
	var raw = ToObject(Get(cooked, "raw"));
	// 5. Let literalSegments be ? ToLength(? Get(raw, "length")).
	var literalSegments = ToLength(Get(raw, "length"));
	// 6. If literalSegments ≤ 0, return the empty string.
	if (literalSegments <= 0) {
		return "";
	}
	// 7. Let stringElements be a new empty List.
	var stringElements = [];
	// 8. Let nextIndex be 0.
	var nextIndex = 0;
	// 9. Repeat,
	// eslint-disable-next-line no-constant-condition
	while(true) {
		// a. Let nextKey be ! ToString(nextIndex).
		var nextKey = ToString(nextIndex);
		// b. Let nextSeg be ? ToString(? Get(raw, nextKey)).
		var nextSeg = ToString(Get(raw, nextKey));
		// c. Append in order the code unit elements of nextSeg to the end of stringElements.
		stringElements.push(nextSeg);
		// d. If nextIndex + 1 = literalSegments, then
		if (nextIndex + 1 == literalSegments) {
			// i. Return the String value whose code units are, in order, the elements in the List stringElements. If stringElements has no elements, the empty string is returned.
			return stringElements.join("");
		}
		// e. If nextIndex < numberOfSubstitutions, let next be substitutions[nextIndex].
		if (nextIndex < numberOfSubstitutions) {
			var next = substitutions[nextIndex];
			// f. Else, let next be the empty String.
		} else {
			next = "";
		}
		// g. Let nextSub be ? ToString(next).
		var nextSub = ToString(next);
		// h. Append in order the code unit elements of nextSub to the end of stringElements.
		stringElements.push(nextSub);
		// i. Increase nextIndex by 1.
		nextIndex += 1;
	}


});
