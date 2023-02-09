import {ObjectStore} from 'fastly:object-store';
import { features } from "./features.js";
import LRUCache from 'mnemonist/lru-cache';

const polyfillMetaCache = new LRUCache(11000);
/**
 * Get the metadata for a specific polyfill within the collection of polyfill sources.
 * @param {String} featureName - The name of a polyfill whose metadata should be returned.
 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.
 */
export async function getPolyfillMeta(store, featureName) {
	let meta = polyfillMetaCache.get(featureName);
	if (meta === undefined) {
		const polyfills = new ObjectStore(store);
		meta = await polyfills.get('/'+featureName + "/meta.json")
		if (meta) {
			meta = meta.json();
			polyfillMetaCache.set(featureName, meta);
		}
	}
	return meta;
}

/**
 * Get a list of all the polyfills which exist within the collection of polyfill sources.
 * @returns {Promise<Array>} A promise which resolves with an array of all the polyfills within the collection.
 */
export function listPolyfills() {
	return features;
}

let _aliases;
/**
 * Get a list of all the polyfill aliases which exist within the collection of polyfill sources.
 * @returns {Promise<Object>} A promise which resolves with an object mapping all the aliases within the collection to the polyfills they include.
 */
export async function listAliases(store) {
	if (_aliases) {
		return _aliases;
	}

	const polyfills = new ObjectStore(store);
	const aliasesFile = await polyfills.get("/aliases.json")
	_aliases = Object.create(null);
	for (const [aliasName, aliasValue] of Object.entries(await aliasesFile.json())) {
		_aliases[aliasName] = aliasValue;
	}
	return _aliases;
}

/**
 * Get the polyfills that are under the same alias.
 * @param {String} alias - The name of an alias whose metadata should be returned.
 * @returns {Promise<Object|undefined>} A promise which resolves with the metadata or with `undefined` if no alias with that name exists.
 */
export async function getConfigAliases(store, alias) {
	const aliases = await listAliases(store);
	return aliases[alias];
}

/**
 * Get the aliases for a specific polyfill.
 * @param {String} featureName - The name of a polyfill whose implementation should be returned.
 * @param {'min'|'raw'} type - Which implementation should be returned: minified or raw implementation.
 * @returns {ReadStream} A ReadStream instance of the polyfill implementation as a utf-8 string.
 */
export async function streamPolyfillSource(store, featureName, type) {
	const polyfills = new ObjectStore(store);
	const polyfill = await polyfills.get('/'+featureName+'/'+ type + ".js");
	return polyfill.text()
}
