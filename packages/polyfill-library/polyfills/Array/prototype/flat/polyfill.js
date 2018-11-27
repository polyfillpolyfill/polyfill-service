CreateMethodProperty(Array.prototype, 'flat', function flat() {
	let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
	const stack = Array.prototype.slice.call(this);
	const result = [];

	while (depth && stack.length) {
		const next = stack.pop();

		if (Object(next) instanceof Array) {
			--depth;

			Array.prototype.push.apply(stack, next);
		} else {
			result.unshift(next);
		}
	}

	return result.concat(stack);
});
