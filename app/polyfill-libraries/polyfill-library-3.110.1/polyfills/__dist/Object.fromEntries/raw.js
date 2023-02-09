
// Object.fromEntries
/* global CreateMethodProperty, RequireObjectCoercible, ToPropertyKey, CreateDataPropertyOrThrow, AddEntriesFromIterable */

// 19.1.2.5 Object.fromEntries ( iterable )
CreateMethodProperty(Object, 'fromEntries', function fromEntries(iterable) {
	// 1. Perform ? RequireObjectCoercible(iterable).
	RequireObjectCoercible(iterable);
	// 2. Let obj be ObjectCreate(%ObjectPrototype%).
	var obj = {};
	// 3. Assert: obj is an extensible ordinary object with no own properties.
	// 4. Let stepsDefine be the algorithm steps defined in CreateDataPropertyOnObject Functions.
	// 5. Let adder be CreateBuiltinFunction(stepsDefine, « »).
	var adder = function (key, value) {
		// Let O be the this value.
		var O = this;
		// Assert: Type(O) is Object.
		// Assert: O is an extensible ordinary object.
		// Let propertyKey be ? ToPropertyKey(key).
		var propertyKey = ToPropertyKey(key);
		// Perform ! CreateDataPropertyOrThrow(O, propertyKey, value).
		CreateDataPropertyOrThrow(O, propertyKey, value);
	};
	// 6. Return ? AddEntriesFromIterable(obj, iterable, adder).
	return AddEntriesFromIterable(obj, iterable, adder);
});
