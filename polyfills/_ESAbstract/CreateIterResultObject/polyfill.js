/* global _ESAbstract */
// 7.4.7. CreateIterResultObject ( value, done )
_ESAbstract.CreateIterResultObject = function (value, done) { // eslint-disable-line no-unused-vars
	// 1. Assert: Type(done) is Boolean.
	if (_ESAbstract.Type(done) !== 'boolean') {
		throw new Error();
	}
	// 2. Let obj be ObjectCreate(%ObjectPrototype%).
	var obj = {};
	// 3. Perform CreateDataProperty(obj, "value", value).
	_ESAbstract.CreateDataProperty(obj, "value", value);
	// 4. Perform CreateDataProperty(obj, "done", done).
	_ESAbstract.CreateDataProperty(obj, "done", done);
	// 5. Return obj.
	return obj;
};
