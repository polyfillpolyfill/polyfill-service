'use strict';

// Proclaim appears to be unable to compare sets in a deepEqual
// (any two sets are considered the same), so convert sets to
// arrays.  Since sets do not have order, sort the resulting
// arrays to ensure they are comparable.
module.exports = function setsToArrays(obj) {
	if (typeof obj !== 'object') return obj;
	if (obj.constructor === Set) return Array.from(obj).sort();
	Object.keys(obj).forEach(k => {
		obj[k] = setsToArrays(obj[k]);
	});
	return obj;
};
