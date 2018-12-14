
# Polyfill-library &middot; [![license][license-badge]][license] [![PRs Welcome][pull-requests-badge]][contributing-guide]

> NodeJS module to create polyfill bundles tailored to individual user-agents

## Install

```bash
npm install polyfill-library --save
```

## Usage

```javascript
const PolyfillLibrary = require('polyfill-service');
const polyfillLibrary = new PolyfillLibrary;

const polyfillBundle = polyfillLibary.getPolyfillString({
	uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
	minify: true,
	features: {
		'es6': { flags: ['gated'] }
	}
}).then(function(bundleString) {
	console.log(bundleString);
});
```

## API

### `polyfillLibrary = new PolyfillLibrary([polyfillsPath])`

Create a PolyfillLibrary instance.

- `@param {String} [polyfillsPath]` - The folder location on the file system where the polyfill sources exist. Defaults to the location of the polyfill sources which come bundled with the polyfill-library module.

### `polyfillLibrary.listAllPolyfills()`

Get a list of all the polyfills which exist within the collection of polyfill sources.

Returns a Promise which resolves with an array of all the polyfills within the collection.

### `polyfillLibrary.describePolyfill(featureName)`

Get the metadata for a specific polyfill within the collection of polyfill sources.

- `@param {String} featureName` - The name of a polyfill whose metadata should be returned.

Returns a Promise which resolves with the metadata or with `undefined` if no metadata exists for the polyfill.

### `polyfillLibrary.getOptions(opts = {})`

Create an options object for use with `getPolyfills` or `getPolyfillString`.

- `@param {object} opts` - Valid keys are uaString, minify, unknown, excludes, rum and features.
- `@param {Boolean} [opts.minify=true]` - Whether to return the minified or raw implementation of the polyfills.
- `@param {'ignore'|'polyfill'} [opts.unknown='ignore']` - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
- `@param {Object} [opts.features={}]` - Which features should be returned if the user-agent does not support them natively.
- `@param {Array<String>} [opts.excludes=[]]` - Which features should be excluded from the returned object.
- `@param {String} [opts.uaString='']` - The user-agent string to check each feature against.
- `@param {Boolean} [opts.rum=false]` - Whether to add a script to the polyfill bundle which reports anonymous usage data.

Returns an object which has merged `opts` with the defaults option values.

### `polyfillLibrary.getPolyfills(opts)`

Given a set of features that should be polyfilled in 'opts.features' (with flags i.e. `{<featurename>: {flags:Set[<flaglist>]}, ...}`), determine which have a configuration valid for the given opts.uaString, and return a promise of set of canonical (unaliased) features (with flags) and polyfills.

- `@param {object} opts` - Valid keys are uaString, minify, unknown, excludes, rum and features.
- `@param {Boolean} [opts.minify=true]` - Whether to return the minified or raw implementation of the polyfills.
- `@param {'ignore'|'polyfill'} [opts.unknown='ignore']` - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
- `@param {Object} [opts.features={}]` - Which features should be returned if the user-agent does not support them natively.
- `@param {Array<String>} [opts.excludes=[]]` - Which features should be excluded from the returned object.
- `@param {String} [opts.uaString='']` - The user-agent string to check each feature against.
- `@param {Boolean} [opts.rum=false]` - Whether to add a script to the polyfill bundle which reports anonymous usage data.

Returns a Promise which resolves to an Object which contains the canonicalised feature definitions filtered for UA.

### `polyfillLibrary.getPolyfillString(opts)`

Create a polyfill bundle.

- `@param {object} opts` - Valid keys are uaString, minify, unknown, excludes, rum and features.
- `@param {Boolean} [opts.minify=true]` - Whether to return the minified or raw implementation of the polyfills.
- `@param {'ignore'|'polyfill'} [opts.unknown='ignore']` - Whether to return all polyfills or no polyfills if the user-agent is unknown or unsupported.
- `@param {Object} [opts.features={}]` - Which features should be returned if the user-agent does not support them natively.
- `@param {Array<String>} [opts.excludes=[]]` - Which features should be excluded from the returned object.
- `@param {String} [opts.uaString='']` - The user-agent string to check each feature against.
- `@param {Boolean} [opts.rum=false]` - Whether to add a script to the polyfill bundle which reports anonymous usage data.
- `@param {Boolean} [opts.stream=false]` - Whether to return a stream or a string of the polyfill bundle.

Returns a polyfill bundle as either a utf-8 ReadStream or as a Promise of a utf-8 String.


## Contributing

Development of polyfill-library happens on GitHub. Read below to learn how you can take part in contributing to Polyfill.io.

### [Contributing Guide][contributing-guide]

Read our [contributing guide][contributing-guide] to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

```
npm run test-all-polyfills # Run the tests for all polyfills using BrowserStack
npm run test-polyfills -- --feature=Array.from # Run the tests for Array.from
npm run test-polyfills -- --feature=Array.from --browserstack # Run the tests for Array.from using BrowserStack
```

### License

Polyfill-library is [MIT licensed][license].

[contributing-guide]: https://example.com
[license]: .././LICENSE.md
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[pull-requests-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
