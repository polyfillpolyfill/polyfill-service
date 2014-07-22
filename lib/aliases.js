/**
 * The AliasResolver provides the logic used for expanding and resolving
 * aliases using more than one mechanism (if required).
 */
module.exports = (function() {

	// Each function takes a Polyfill identifier and, if it is not a canonical
	// identifier, tries to unalias the name to a canonical name or another
	// alias closer to a canonical name.
	//
	// Each function is called with the result of the previous function,

	// A list of functions that transform aliases to canonical polyfill names.
	// Each step should work towards resolving an alias to a canonical
	// polyfill name and each step should preserve the alias that was used to
	// include the canonical polyfill by adding an aliasOf property on each
	// object.  If a name can not be resolved it should be returned to allow
	// subsequent resolving functions to handle and to allow any canonical
	// names that have already been resolved to pass through each function.
	var aliasResolvers = [];

	/**
	 * Resolve an alias using the resolver function list.  Each is called in turn until
	 * a list of expandedAliases remain.  The current list of expanded aliases
	 * is passed to the next function in the list to achieve a cheap linear expansion of
	 * names.
	 *
	 * @param {array} polyfillAliases The list of aliases to resolve
	 * @returns {array} An expanded list of resolved aliases.
	 */
	function resolve(polyfillAliases) {
		var expandedAliases = polyfillAliases;

		aliasResolvers.forEach(function(resolver) {
			expandedAliases = applyResolverToAliases(expandedAliases, resolver);
		});

		return expandedAliases;
	};

	/**
	 * Run an alias resolution function over each element in an array of polyfill objects.
	 *
	 * Each polyfill object's name may be an alias rather than a canonical name. The
	 * resolving function may try to expand these polyfill names to another
	 * name. If it does not know how to expand the name, it is ignored and returned without
	 * change in the new, potentially expanded, array of polyfill objects.
	 *
	 * @param {array}    aliases       A list of aliased polyfills to expand.
	 * @param {Function} aliasResolver A function to apply to each polyfill
	 *                                 object in the list of aliases.  The
	 *                                 function takes a polyfill as an object,
	 *                                 and returns an array of polyfill objects
	 *                                 with an additional 'aliasOf' field to
	 *                                 indicate the original alias that included
	 *                                 the polyfill.
	 *
	 * @return {array} An expanded list of aliases
	 */
	function applyResolverToAliases(aliases, aliasResolver) {

		var expandedPolyfills = flatMap(aliases, function(polyfillIdentifier) {
			// Map the resolver over the aliases and flatten
			var polyfillIdentifierNames = aliasResolver(polyfillIdentifier.name);

			return polyfillIdentifierNames.map(function(name) {
				return {
					name: name,
					flags: polyfillIdentifier.flags,
					aliasOf: polyfillIdentifier.aliasOf || [polyfillIdentifier.name]
				};
			});
		});

		// Remove duplicates: When removing duplicates, if one is found ->
		// concat the flags and the aliasOf fields.
		var polyfillSet = {};
		expandedPolyfills.forEach(function(polyfill) {
			if (!polyfillSet[polyfill.name]) {
				polyfillSet[polyfill.name] = polyfill;
			} else {
				polyfillSet[polyfill.name].aliasOf = polyfillSet[polyfill.name].aliasOf.concat(polyfill.aliasOf);
				polyfillSet[polyfill.name].flags   = polyfillSet[polyfill.name].flags.concat(polyfill.flags);
			}
		});

		// Get the objects values (Kind of like an Object.values function)
		var arrayOfPolyfills = Object.keys(polyfillSet).map(function(key) { return polyfillSet[key]; });

		return arrayOfPolyfills;
	}

	return {
		resolvePolyfills: resolve,
		addResolver: function(func) {
			aliasResolvers.push(func);
			return this;
		}
	}
}());

/*
	if (aliases) {
	}

	return [polyfill];

	8?§
/**
 * Apply a function to each element in the array and concatenate the result
 * of the function into a new array.
 *
 * @example The difference between map and flatMap
 * > [0, 1, 2].map(function(val) {return [val + 1, val + 2]; });
 * [ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]
 *
 * > flatMap([0, 1, 2], function(val) { return [val + 1, val + 2]; });
 * [ 1, 2, 2, 3, 3, 4 ]
 */
function flatMap(array, func) {
	return Array.prototype.concat.apply([], array.map(func));
};
