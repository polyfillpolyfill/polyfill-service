// 22.1.3.14. Array.prototype.keys ( )
CreateMethodProperty(Array.prototype, 'keys', function () {
	// 1. Let O be ? ToObject(this value).
	var O = ToObject(this);
	// 2. Return CreateArrayIterator(O, "key").
	// TODO: Add CreateArrayIterator.
	return new ArrayIterator(O, 'key');
});
