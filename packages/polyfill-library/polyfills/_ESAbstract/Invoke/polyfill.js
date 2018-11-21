/* global GetV, Call */
// 7.3.18. Invoke ( V, P [ , argumentsList ] )
function Invoke(V, P /* [ , argumentsList ] */) { // eslint-disable-line no-unused-vars
	// 1. Assert: IsPropertyKey(P) is true.
	// 2. If argumentsList is not present, set argumentsList to a new empty List.
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	// 3. Let func be ? GetV(V, P).
	var func = GetV(V, P);
	// 4. Return ? Call(func, V, argumentsList).
	return Call(func, V, argumentsList);
}
