
// _ESAbstract.CreateListFromArrayLike
/* global Type, ToLength, Get, ToString */
// 7.3.17 CreateListFromArrayLike ( obj [ , elementTypes ] )
function CreateListFromArrayLike(obj /*[ , elementTypes ]*/) { // eslint-disable-line no-unused-vars
	// 1. If elementTypes is not present, set elementTypes to « Undefined, Null, Boolean, String, Symbol, Number, Object ».
	var elementTypes = 1 in arguments ? arguments[1] : ['undefined', 'null', 'boolean', 'string', 'symbol', 'number', 'object'];
	// 2. If Type(obj) is not Object, throw a TypeError exception.
	if (Type(obj) !== 'object') {
		throw new TypeError(Object.prototype.toString.call(obj) + ' is not an Object');
	}
	// 3. Let len be ? ToLength(? Get(obj, "length")).
	var len = ToLength(Get(obj, 'length'));
	// 4. Let list be a new empty List.
	var list = [];
	// 5. Let index be 0.
	var index = 0;
	// 6. Repeat, while index < len
	while (index < len) {
		// a. Let indexName be ! ToString(index).
		var indexName = ToString(index);
		// b. Let next be ? Get(obj, indexName).
		var next = Get(obj, indexName);
		// c. If Type(next) is not an element of elementTypes, throw a TypeError exception.
		if (!elementTypes.includes(Type(next))) {
			throw new TypeError(Object.prototype.toString.call(next) + ' is not one of the required types: ' + Array.prototype.join.call(elementTypes, ','));
		}
		// d. Append next as the last element of list.
		list.push(next);
		// e. Increase index by 1.
		index = index + 1;
	}
	// 7. Return list.
	return list;
}
