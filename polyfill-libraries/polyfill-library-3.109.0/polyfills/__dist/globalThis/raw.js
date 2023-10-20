
// globalThis
// 18.1.1 globalThis
(function() {

	/*
		polyfill.io - This code ensures that the referenced object is not an
		object which is not infact the global object. This is needed because
		the Firefox Content Script environment does some funky stuff
		such as creating a frozen `self` global object which is not the same
		`self` global object that is used in browser environments.
		https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Add-on_SDK/Guides/Content_Scripts/self

		As well as the above, Firefox Content Scripts run in a secure sandbox
		which returns `[object Opaque]` when accessing globals such as Object
		instead of the actual global Object object.
		https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Xray_vision#Xrays_for_JavaScript_objects
	*/
	function isNotFirefoxContentScriptEnviroment(root) {
		return root && root.Object == Object && root;
	}

	var freeGlobalThis = isNotFirefoxContentScriptEnviroment(
		typeof globalThis == "object" && globalThis
	);
	var freeWindow = isNotFirefoxContentScriptEnviroment(
		typeof window == "object" && window
	);
	var freeSelf = isNotFirefoxContentScriptEnviroment(
		typeof self == "object" && self
	);
	var freeGlobal = isNotFirefoxContentScriptEnviroment(
		typeof global == "object" && global // eslint-disable-line no-undef
	);

	var globalThis =
		// Modern browsers which already have globalThis but are running this polyfill anyway.
		freeGlobalThis ||
		// All browsers which are running the polyfill in their main thread.
		freeWindow ||
		// All browsers which are running the polyfill in a Worker environment such as Web Workers or Service Workers.
		freeSelf ||
		// NodeJS
		freeGlobal ||
		// Everything else so long as they are not running with a Content Security Policy which forbids using `Function`.
		// If you reach here and have CSP forbidding `Function`, please open an issue on https://github.com/Financial-Times/polyfill-library
		Function("return this")();

	// Export the object
	try {
		Object.defineProperty(globalThis, "globalThis", {
			configurable: true,
			enumerable: false,
			writable: true,
			value: globalThis
		});
	} catch (e) {
		// IE8 throws an error here if we set enumerable to false.
		// More info on table 2: https://msdn.microsoft.com/en-us/library/dd229916(v=vs.85).aspx
		globalThis.globalThis = globalThis;
	}
})();
