
// _ESAbstract.RegExpExec
/* global Call, Get, IsCallable, Type */

// 22.2.5.2.1 RegExpExec ( R, S )
function RegExpExec(R, S) { // eslint-disable-line no-unused-vars
	// 1. Let exec be ? Get(R, "exec").
	var exec = Get(R, 'exec');
	// 2. If IsCallable(exec) is true, then
	if (IsCallable(exec)) {
		// 2.a. Let result be ? Call(exec, R, « S »).
		var result = Call(exec, R, [ S ]);
		// 2.b. If Type(result) is neither Object nor Null, throw a TypeError exception.
		if (Type(result) !== 'object' && Type(result) !== 'null') {
			throw new TypeError('Invalid result: must be an object or null.');
		}
		// 2.c. Return result.
		return result;
	}
	// 3. Perform ? RequireInternalSlot(R, [[RegExpMatcher]]).
	// 4. Return ? RegExpBuiltinExec(R, S).
	return Call(RegExp.prototype.exec, R, [ S ]);
}
