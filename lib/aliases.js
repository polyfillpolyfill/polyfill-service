/**
 * AliasResolvers provide logic used for expanding and resolving feature identifiers using more than one mechanism (if required).
 *
 * A feature identifier is an object key with optionally a 'flags' (array) property and other properties.  The key is the string identifying a feature (or group of features), 'flags' is an array containing any flags that alter the way that the feature should be polyfilled (and therefore also need to apply to any aliased polyfills), while all other properties are preserved only on the parent.
 *
 *  e.g: { "modernizr:es5": { flags: ["always"] } }
 */


/** An array of functions that map a feature name identifier (e.g. an alias)
 * to a promise of a set of alternate string identifiers (e.g. expanded names the alias refers to)
 *
 * The key point is that each is invoked in sequence with the result of
 * the previous resolver function as an argument.
 */
module.exports = function(polyfillNameResolverFunctions) {

	if (typeof polyfillNameResolverFunctions === 'function') {
		polyfillNameResolverFunctions = [polyfillNameResolverFunctions];
	}

	/**
	 * Resolve an array of polyfill identifiers by iteratively invoking the
	 * resolver functions on each element.
	 *
	 * @param {array} featureSet The feature identifiers to resolve.
	 * @returns {array} A list of resolved feature identifiers.
	 */
	return function(featureSet) {
		return polyfillNameResolverFunctions.reduce(function(resolvingSetPromise, resolverFunction) {
			return resolvingSetPromise.then(function(set) {
				return applyResolverToIdentifiers(set, resolverFunction);
			});
		}, Promise.resolve(Object.assign({}, featureSet)));  // Start with copy of featureSet to avoid mutating the arg
	};
}


/**
 * Run a name resolver function over each polyfill identifier in an array,
 * remove duplicates after the resolution and keep track of aliases and
 * flags.
 *
 * @param {array}    featureSet           A list of feature identifier objects to expand.
 * @param {Function} nameResolverFunction The function to use in the resolution process. Must take a string name as a single arg and return an array of names to which the specified name maps, or undefined if it has no mapping for that name.
 *
 * @return {array} An expanded list of polyfill identifiers
 */
function applyResolverToIdentifiers(featureSet, nameResolverFunction) {
	var _ = require('lodash');
	var newNamesDiscovered = false;

	function run() {
		return Promise.all(Object.keys(featureSet).map(function(featureName) {
			var feature = featureSet[featureName];
			return Promise.resolve(nameResolverFunction(featureName)).then(function(resultItems) {

				// No aliases for this feature - do not modify feature set
				if (!Array.isArray(resultItems)) return true;
				if (resultItems.length === 1 && resultItems[0] === featureName) return true;

				resultItems.forEach(function(newName) {
					if (newName !== featureName) {
						var result = _.extend({}, feature, {
							aliasOf: _.uniq([featureName].concat(feature.aliasOf || [])),
							flags: feature.flags || []
						});

						if (!featureSet[newName]) {
							featureSet[newName] = result;
							newNamesDiscovered = true;
						} else {
							['flags', 'aliasOf'].forEach(function mergeProperties(prop) {
								featureSet[newName][prop] = (prop in featureSet[newName]) ? _.uniq(featureSet[newName][prop].concat(result[prop])).sort() : result[prop];
							});
						}
					}
				});

				// If alias resolver returned a list that did not include the original name, remove that from the feature set
				if (resultItems.indexOf(featureName) === -1) delete featureSet[featureName];
			});
		})).then(function() {
			if (newNamesDiscovered) {
				newNamesDiscovered = false;
				return run();
			}
		});
	}

	return run().then(function() {
		return featureSet;
	});
}
