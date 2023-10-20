
// _ESAbstract.ToPropertyDescriptor
/* globals Type, HasProperty, ToBoolean, Get, IsCallable */
// 6.2.5.5 ToPropertyDescriptor ( Obj )
function ToPropertyDescriptor(Obj) { // eslint-disable-line no-unused-vars
	// 1. If Type(Obj) is not Object, throw a TypeError exception.
	if (Type(Obj) !== 'object') {
		throw new TypeError('ToPropertyDescriptor requires an object and was given an ' + Object.prototype.toString.call(Obj));
	}
	// 2. Let desc be a new Property Descriptor that initially has no fields.
	var desc = {};
	// 3. Let hasEnumerable be ? HasProperty(Obj, "enumerable").
	var hasEnumerable = HasProperty(Obj, 'enumerable');
	// 4. If hasEnumerable is true, then
	if (hasEnumerable) {
		// a. Let enumerable be ToBoolean(? Get(Obj, "enumerable")).
		var enumerable = ToBoolean(Get(Obj, 'enumerable'));
		// b. Set desc.[[Enumerable]] to enumerable.
		desc['[[Enumerable]]'] = enumerable;
	}
	// 5. Let hasConfigurable be ? HasProperty(Obj, "configurable").
	var hasConfigurable = HasProperty(Obj, 'configurable');
	// 6. If hasConfigurable is true, then
	if (hasConfigurable) {
		// a. Let configurable be ToBoolean(? Get(Obj, "configurable")).
		var configurable = ToBoolean(Get(Obj, 'configurable'));
		// b. Set desc.[[Configurable]] to configurable.
		desc['[[Configurable]]'] = configurable;
	}
	// 7. Let hasValue be ? HasProperty(Obj, "value").
	var hasValue = HasProperty(Obj, 'value');
	// 8. If hasValue is true, then
	if (hasValue) {
		// a. Let value be ? Get(Obj, "value").
		var value = Get(Obj, "value");
		// b. Set desc.[[Value]] to value.
		desc['[[Value]]'] = value;
	}
	// 9. Let hasWritable be ? HasProperty(Obj, "writable").
	var hasWritable = HasProperty(Obj, 'writable');
	// 10. If hasWritable is true, then
	if (hasWritable) {
		// a. Let writable be ToBoolean(? Get(Obj, "writable")).
		var writable = ToBoolean(Get(Obj, "writable"));
		// b. Set desc.[[Writable]] to writable.
		desc['[[Writable]]'] = writable;
	}
	// 11. Let hasGet be ? HasProperty(Obj, "get").
	var hasGet = HasProperty(Obj, 'get');
	// 12. If hasGet is true, then
	if (hasGet) {
		// a. Let getter be ? Get(Obj, "get").
		var getter = Get(Obj, "get");
		// b. If IsCallable(getter) is false and getter is not undefined, throw a TypeError exception.
		if (IsCallable(getter) === false && getter !== undefined) {
			throw new TypeError('getter must be a function');
		}
		// c. Set desc.[[Get]] to getter.
		desc['[[Get]]'] = getter;
	}
	// 13. Let hasSet be ? HasProperty(Obj, "set").
	var hasSet = HasProperty(Obj, "set");
	// 14. If hasSet is true, then
	if (hasSet) {
		// a. Let setter be ? Get(Obj, "set").
		var setter = Get(Obj, "set");
		// b. If IsCallable(setter) is false and setter is not undefined, throw a TypeError exception.
		if (IsCallable(setter) === false && setter !== undefined) {
			throw new TypeError('setter must be a function');
		}
		// c. Set desc.[[Set]] to setter.
		desc['[[Set]]'] = setter;
	}
	// 15. If desc.[[Get]] is present or desc.[[Set]] is present, then
	if ((HasProperty(desc, '[[Get]]') || HasProperty(desc, '[[Set]]'))) {
		// a. If desc.[[Value]] is present or desc.[[Writable]] is present, throw a TypeError exception.
		if (HasProperty(desc, '[[Value]]') || HasProperty(desc, '[[Writable]]')) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
	}
	// 16. Return desc.
	return desc;
}
