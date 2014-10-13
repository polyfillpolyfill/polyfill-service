# Polyfill service

[![Build
Status](https://travis-ci.org/Financial-Times/polyfill-service.svg?branch=master)](https://travis-ci.org/Financial-Times/polyfill-service)

**polyfill** makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.  For usage information see the [hosted service](http://polyfill.webservices.ft.com), which formats and displays the service API documentation located in the [docs](docs/) folder.

## Installing as a service

To install polyfill as a service:

1. Install [git](http://git-scm.com/downloads) and [Node](http://nodejs.org) on your system
2. Clone this repository to your system (`git clone git@github.com:Financial-Times/polyfill-service.git`)
3. Run `npm install`

To run the app for **development**:

Install [nodemon](http://nodemon.io/), and run `nodemon -e js,json service/index.js` from the root of the working tree.  This will watch your filesystem and automatically restart if you make any changes to any of the app source code or polyfill config files.

To run the app for **production**:

Run `npm start`.  This will run the service using [forever](https://github.com/nodejitsu/forever), which runs the process in the background, monitors it and restarts it automatically if it dies.  It doesn't watch the filesystem for changes and you won't see any console output.

In either case, once the service is running, navigate to [http://localhost:3000](http://localhost:3000) in your browser

Alternatively, deploy straight to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/Financial-Times/polyfill-service)

For an HTTP API reference, see the [hosted service documentation](http://polyfill.webservices.ft.com).

## Using as a library

Polyfill service can also be used as a library in NodeJS projects.  To do this:

1. Add this repo as a dependency in your package.json
2. Rebuild your project using `npm install`
3. Use the API from your code

### Library API reference

#### `getPolyfillString(options)` (method)

Returns a bundle of polyfills as a string.  Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for polyfills that should be included conditionally
* `minify`: Boolean, optional. Whether to minify the bundle
* `type`: String, optional. 'js' or 'css', defaults to js
* `features`: Array, optional.  The list of features that are to be considered for polyfill inclusion.  If not supplied, all default features will be considered.  Each feature must be in the form of an object with the following properties:
	* `name`: String, required. Name of features, matching a folder name in the polyfills directory, or a known alias
	* `flags`: Array, optional. Array of flags to apply to this feature (see below)

Flags that may be applied to polyfills are:

* `gated`: Wrap this polyfill in a feature-detect, to avoid overwriting the native implementation
* `always`: Include this polyfill regardless of the user-agent

Example:

```javascript
require('polyfill-service').getPolyfillString({
	uaString: "Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)",
	minify: true,
	features: [
		{name:"Element.prototype.matches", flags:['always', 'gated']},
		{name:"modernizr:es5array"}
	]
}));
```

#### `getPolyfills(options)` (method)

Returns a list of features whose configuration matches the given user agent string.
Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for features that should be included conditionally
* `features`: Array, optional.  The list of features that are to be considered for polyfill inclusion.  If not supplied, all default features will be considered.  Each feature must be in the form of an object with the following properties:
	* `name`: String, required. Name of features, matching a folder name in the polyfills directory, or a known alias
	* `flags`: Array, optional. Array of flags to apply to this feature (see above in `getPolyfillString`)

Example:

```javascript
require('polyfill-service').getPolyfills({
	uaString: "Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)",
	features: [
		{name:"Element.prototype.matches", flags:['always', 'gated']},
		{name:"modernizr:es5array"}
	]
});
```

#### `getAllPolyfills()` (method)

Return a list of all the features with polyfills as an array of strings. This
list corresponds to directories in the `/polyfills` directory.

Example:

```javascript
require('polyfill-service').getAllPolyfills();
```

## Polyfill configuration

All polyfills are located in the polyfills directory, with one subdirectory per polyfill, named after the API method which is the subject of the polyfill.  Each polyfill folder may contain:

* `polyfill.js`: Required. Code to apply the polyfill behaviour, meeting the following requirements:
	* Must perfectly replicate the API of the feature
	* Must not be wrapped in a feature detect (the service will add this)
	* Must not contain polyfills for other features (instead, depend on those polyfills)
* `detect.js`: A single expression that returns true if the feature is present in the browser (and the polyfill is therefore not required), false otherwise.  Can be an IIFE.  If not present, polyfill cannot be gated.
* `config.json`: A config file conforming to the spec below

The config.json file may contain any of the following keys:

* `browsers`: Object, one key per browser family name (see [browsers](#browsers) for details), with the value forming either a range or a list of specific versions separated by double pipes, idenitfying the versions to which the polyfill *should be applied*. See [node-semver ranges](https://github.com/npm/node-semver#ranges).  This range is subject to our [baseline support](#browsers).
* `aliases`: Array, a list of alternate names for referencing the polyfill.  In the example Modernizr names are explicitly namespaced.
* `dependencies`: Array, a list of canonical polyfill names for polyfills that must be included prior to this one.
* `author`: Object, metadata about the author of the polyfill, following [NPM convention](https://www.npmjs.org/doc/json.html#people-fields-author-contributors)
* `licence`: String, an [SPDX](https://spdx.org/licenses/) identifier for an [OSI Approved](http://opensource.org/licenses/alphabetical) license  (Or CC0 which is GPL compatible)

Example:

```json
{
	"browsers": {
		"ie": "6-9",
		"firefox": "<=20",
		"opera": "11 || 14",
		"safari": "<=4",
		"ios_saf" "<=6"
	},
	"aliases": [
		"modernizr:es5array"
	],
	"dependencies": [
		"Object.defineProperties",
		"Object.create"
	],
	"author": {
		"name" : "Person B",
		"email" : "b@example.com",
		"url" : "http://person.example.com"
	},
	"license": "Zlib"
}
```

A request from IE7 would receive this polyfill, since it is targeted to IE 6-9.  It *may* also receive polyfills for `Object.defineProperties` and `Object.create`, since those are dependencies of the polyfill in this example, if those polyfills also apply in IE7.


### Browsers

The short names should be used in the `config.json` to configure the browser support using the `browsers` key.  All browsers are subject to a minimum version to be considered 'worth polyfilling'.  If a request for polyfills is received from an unidentifiable user-agent or one that is older than the minimum supported version, the polyfill bundle will be empty.


| Short name | User Agent Name          | Min supported version |
|:----------:|:-------------------------|:----------------------|
| `ie`       | Internet Explorer        | 6                     |
| `ie_mob`   | Internet Explorer Mobile | 8                     |
| `chrome`   | Chrome                   | 1                     |
| `safari`   | Safari                   | 3                     |
| `ios_saf`  | Safari on iOS            | 3                     |
| `firefox`  | Firefox                  | 3.6                   |
| `android`  | Android Browser          | 2.3                   |
| `opera`    | Opera                    | 11                    |
| `op_mob`   | Opera Mobile             | 10                    |
| `op_mini`  | Opera Mini               | 5                     |
| `bb`       | Blackberry               | 6                     |

The minimum supported version is intentionally lower than most developers will need, because *it cannot be safely lowered*.  We raise the minimum when testing on a particular browser becomes inconveniently hard.
