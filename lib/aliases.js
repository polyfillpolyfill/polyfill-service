/**
 * The AliasResolver provides the logic used for expanding and resolving
 * aliases using more than one mechanism (if required).
 */
module.exports = (function() {
	var polyfillConfigAliases = {};

	// A list of functions that resolve names of polyfills
	// preserving the original polyfill name relationship, this uses the
	// dictionary of aliases that the module was initialised with using the
	// initialise function.
	var aliasResolvers = [
		function expandAliasFromConfig(polyfill) {

			var aliases = polyfillConfigAliases[polyfill.name];

			if (aliases) {
				return aliases.map(function(alias) {
					return {
						name: alias,
						flags: polyfill.flags,
						aliasOf: [polyfill.aliasOf || polyfill.name]
					};
				});
			}

			return [polyfill];
		}
	];


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
	 * Run an alias resolver over each member in a list of aliases.  This should
	 * result in an array of new names that potentially contain the expanded
	 * aliases depending on the aliasResolver function.
	 *
	 * @param {array}    aliases       A list of aliased polyfills to expand.
	 * @param {Function} aliasResolver A function to apply to each member in the
	 *                                 list of aliases.  The function takes a
	 *                                 polyfill as an object, and returns an array
	 *                                 of objects with metadata.
	 * @return {array} An expanded list of aliases
	 */
	function applyResolverToAliases(aliases, aliasResolver) {

		var expandedPolyfills = flatMap(aliases, function(name) {
			// Map the resolver over the aliases and flatten
			return aliasResolver(name);
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

		// Flatten the 'Set' we've created using the Object into an array
		var arrayOfPolyfills = [];
		for (var polyfillName in polyfillSet) {
			if (polyfillSet.hasOwnProperty(polyfillName)) {
				arrayOfPolyfills.push(polyfillSet[polyfillName]);
			}
		}

		return arrayOfPolyfills;
	}

	function setUpAliasesFromConfig(presetAliases) {
		polyfillConfigAliases = presetAliases;
	}

	return {
		initialiseAliasesFromConfig: setUpAliasesFromConfig,
		resolvePolyfills: resolve
	}
}());


/**
 * FP Helper:
 * flatMap the terms in the array using lambda.
 */
function flatMap(array, lambda) {
	return Array.prototype.concat.apply([], array.map(lambda));
};
