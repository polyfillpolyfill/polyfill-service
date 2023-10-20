
// Function.prototype.name
(function () {

	var
	accessorName = 'name',
	fnNameMatchRegex = /^\s*function\s+([^(\s]*)\s*/,
	$Function = Function,
	FunctionName = 'Function',
	FunctionProto = $Function.prototype,
	FunctionProtoCtor = FunctionProto.constructor,

	getFunctionName = function(fn) {
		var match, name;

		if (fn === $Function || fn === FunctionProtoCtor) {
			name = FunctionName;
		}
		else if (fn !== FunctionProto) {
			match = ('' + fn).match(fnNameMatchRegex);
			name = match && match[1];
		}
		return name || '';
	};


	Object.defineProperty(FunctionProto, accessorName, {
		get: function Function$name() {
			var
			fn = this,
			fnName = getFunctionName(fn);

			// Since named function definitions have immutable names, also memoize the
			// output by defining the `name` property directly on this Function
			// instance so the accessor function will not need to be invoked again.
			if (fn !== FunctionProto) {
				Object.defineProperty(fn, accessorName, {
					value: fnName,
					configurable: true
				});
			}

			return fnName;
		},
		configurable: true
	});

}());
