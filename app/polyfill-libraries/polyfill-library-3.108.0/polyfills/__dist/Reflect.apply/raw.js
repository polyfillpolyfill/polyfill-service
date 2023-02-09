
// Reflect.apply
/* global CreateMethodProperty, IsCallable, CreateListFromArrayLike, Call, Reflect*/
// 26.1.1 Reflect.apply ( target, thisArgument, argumentsList )
CreateMethodProperty(Reflect, 'apply', function apply(target, thisArgument, argumentsList ) {
	// 1. If IsCallable(target) is false, throw a TypeError exception.
	if (IsCallable(target) === false) {
		throw new TypeError('Reflect.apply was called on ' + Object.prototype.toString.call(target) + ', which is not a function');
	}
	// 2. Let args be ? CreateListFromArrayLike(argumentsList).
	var args = CreateListFromArrayLike(argumentsList);
	// Polyfill-library -- This is not required for us to implement because we do not control the execution stack.
	// 3. Perform PrepareForTailCall().

	// 4. Return ? Call(target, thisArgument, args).
	return Call(target, thisArgument, args);
});
