
// Reflect.construct
/* global CreateMethodProperty, Reflect, IsConstructor, CreateListFromArrayLike, Construct */
// 26.1.2 Reflect.construct ( target, argumentsList [ , newTarget ] )
CreateMethodProperty(Reflect, 'construct', function construct(target, argumentsList /*[ , newTarget ]*/) {
	var newTarget = arguments[2];
	// 1. If IsConstructor(target) is false, throw a TypeError exception.
	if(IsConstructor(target) === false) {
		throw new TypeError(Object.prototype.toString.call(target) + ' is not a constructor');
	}
	// 2. If newTarget is not present, set newTarget to target.
	if (!(2 in arguments)){
		newTarget = target;
		// 3. Else if IsConstructor(newTarget) is false, throw a TypeError exception.
	} else if (IsConstructor(newTarget) === false) {
		throw new TypeError(Object.prototype.toString.call(newTarget) + ' is not a constructor');
	}
	// 4. Let args be ? CreateListFromArrayLike(argumentsList).
	var args = CreateListFromArrayLike(argumentsList);
	// 5. Return ? Construct(target, args, newTarget).
	return Construct(target, args, newTarget);
});
