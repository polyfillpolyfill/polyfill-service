/**
 * AliasResolvers provide logic used for expanding and resolving feature identifiers using more than one mechanism (if required).
 *
 * A feature identifier is an object key with optionally a 'flags' (Set) property and other properties.  The key is the string identifying a feature (or group of features), 'flags' is a Set containing any flags that alter the way that the feature should be polyfilled (and therefore also need to apply to any aliased polyfills), while all other properties are preserved only on the parent.
 *
 *  e.g: { "modernizr:es5": { flags: Set["always"] } }
 */

'use strict';

/* An array of functions that map a feature name identifier (e.g. an alias)
 * to an array of alternate string identifiers (e.g. expanded names the alias refers to)
 *
 * The key point is that each is invoked in sequence with the result of
 * the previous resolver function as an argument.
 */
module.exports = function (...polyfillNameResolverFunctions) {

	/**
	 * Resolve an array of polyfill identifiers by iteratively invoking the
	 * resolver functions on each element.
	 *
	 * @param {object} featureSet The feature identifiers to resolve.
	 * @returns {Promise<array>} A list of resolved feature identifiers.
	 */
	return function(featureSet) {
		return polyfillNameResolverFunctions.reduce((resolvingSetPromise, resolverFunction) => {
			return resolvingSetPromise.then(set => applyResolverToIdentifiers(set, resolverFunction));
		}, Promise.resolve(Object.assign({}, featureSet))); // Start with copy of featureSet to avoid mutating the arg
	};
};


/**
 * Run a name resolver function over each polyfill identifier in an array,
 * remove duplicates after the resolution and keep track of aliases and
 * flags.
 *
 * @param {object}    featureSet           A list of feature identifier objects to expand.
 * @param {Function} nameResolverFunction The function to use in the resolution process. Must take a string name as a single arg and return an array of names to which the specified name maps, or undefined if it has no mapping for that name.
 *
 * @return {array} An expanded list of polyfill identifiers
 */
function applyResolverToIdentifiers(featureSet, nameResolverFunction) {
	const processQueue = Object.keys(featureSet);

	while (processQueue.length > 0) {
		const featureName = processQueue.shift();
		const feature = featureSet[featureName];
		const resultItems = nameResolverFunction(featureName);

		// No aliases for this feature - do not modify feature set
		if (!Array.isArray(resultItems)) continue;
		if (resultItems.length === 1 && resultItems[0] === featureName) continue;

		resultItems.forEach(function(newName) {
			if (newName !== featureName) {

				const props = {
					aliasOf: new Set([featureName, ...(feature.aliasOf || [])]),
					flags: new Set([...(feature.flags || [])])
				};

				if (!featureSet[newName]) {
					featureSet[newName] = Object.assign({}, feature, props);
					processQueue.push(newName);
				} else {

					// Merge properties of source into properties of target
					// Eg. 'es6|always' becomes 'Set|always', 'Map|always' etc.
					// Note: optimisation here is important, a previous slower merge technique used to block the event loop for long periods
					['flags', 'aliasOf'].forEach(prop => {
						for (const v of props[prop]) {
							if (!(prop in featureSet[newName])) {
								featureSet[newName][prop] = new Set();
							}
							featureSet[newName][prop].add(v);
						}
					});
				}
			}
		});

		// If alias resolver returned a list that did not include the original name, remove that from the feature set
		if (resultItems.indexOf(featureName) === -1) delete featureSet[featureName];
	}

	return Promise.resolve(featureSet);
}
