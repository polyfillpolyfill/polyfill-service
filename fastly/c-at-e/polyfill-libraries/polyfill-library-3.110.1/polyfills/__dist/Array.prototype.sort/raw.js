
// Array.prototype.sort
/* global CreateMethodProperty, IsCallable */
"use strict";

var origSort = Array.prototype.sort;

// 22.1.3.27 Array.prototype.sort ( comparefn )
// The elements of this array are sorted. The sort must be stable (that is,
// elements that compare equal must remain in their original order). If
// comparefn is not undefined, it should be a function that accepts two
// arguments x and y and returns a negative value
// if x < y, zero if x = y, or a positive value if x > y.

CreateMethodProperty(Array.prototype, "sort", function sort(compareFn) {
	// 1. If comparefn is not undefined and IsCallable(comparefn) is false, throw
	//    a TypeError exception.
	if (compareFn !== undefined && IsCallable(compareFn) === false) {
		throw new TypeError(
			"The comparison function must be either a function or undefined"
		);
	}

	// Polyfill.io - the steps below are handled by the native
	// Array.prototype.sort method that we call.
	// 2.Let obj be ? ToObject(this value).
	// 3.Let len be ? LengthOfArrayLike(obj).

	// if comprateFn does not exist, use the spec defined in-built SortCompare.
	if (compareFn === undefined) {
		origSort.call(this);
	} else {
		// if compareFn exists, sort the array, breaking sorting ties by using the
		// items' original index position.

		// Keep track of the items starting index position.
		var that = Array.prototype.map.call(this, function(item, index) {
			return { item: item, index: index };
		});
		origSort.call(that, function(a, b) {
			var compareResult = compareFn.call(undefined, a.item, b.item);
			return compareResult === 0 ? a.index - b.index : compareResult;
		});
		// update the original object (`this`) with the new position for the items
		// which were moved.
		for (var a in that) {
			if (Object.prototype.hasOwnProperty.call(that, a)) {
				if (that[a].item !== this[a]) {
					this[a] = that[a].item;
				}
			}
		}
	}

	return this;
});
