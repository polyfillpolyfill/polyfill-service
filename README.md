# Polyfill service

[![Build
Status](https://travis-ci.org/Financial-Times/polyfill-service.svg?branch=master)](https://travis-ci.org/Financial-Times/polyfill-service)

**polyfill** makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.  For usage information see the [hosted service](http://polyfill.webservices.ft.com), which formats and displays the service API documentation located in the [docs](docs/) folder.

## Installing as a service

To install and run polyfill as a service:

1. Install [git](http://git-scm.com/downloads) and [Node](http://nodejs.org) on your system
2. Fork this repository.  You can do that [here](https://github.com/financial-times/polyfill-service/fork)
3. Clone this repository to your system (`git clone git@github.com:Financial-Times/polyfill-service.git`)
4. Run `npm install`
5. Run `npm start` and navigate to `http://localhost:3000` in your browser

For an API reference for the service, see the [hosted service documentation](http://polyfill.webservices.ft.com).

## Using as a library

Polyfill service can also be used as a library in NodeJS projects.  To do this:

1. Add this repo as a dependency in your package.json
2. Rebuild your project using `npm install`
3. Use the API from your code

### Library API reference

#### `getPolyfills(options)` (method)

Returns a bundle of polyfills as a string.  Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for polyfills that should be included conditionally
* `minify`: Boolean, optional. Whether to minify the bundle
* `type`: String, optional. 'js' or 'css', defaults to js
* `polyfills`: Array, optional.  The list of polyfills that are to be considered for inclusion.  If not supplied, all polyfills will be considered.  Each polyfill must be in the form of an object with the following properties:
	* `name`: String, required. Name of polyfill, matching a folder name in the polyfills directory, or a known alias
	* `flags`: Array, optional. Array of flags to apply to this polyfill (see below)

Flags that may be applied to polyfills are:

* `gated`: Wrap this polyfill in a feature-detect, to avoid overwriting the native implementation
* `always`: Include this polyfill regardless of the user-agent

Example:

```javascript
require('polyfill-service').getPolyfills({
	uaString: "Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)",
	minify: true,
	polyfills: [
		{name:"Element.prototype.matches", flags:['always', 'gated']},
		{name:"modernizr:es5array"}
	]
}));
```

## Polyfill configuration

All polyfills are located in the polyfills directory, with one subdirectory per polyfill, named after the API method which is the subject of the polyfill.  Each polyfill folder may contain:

* `polyfill.js`: Required. Code to apply the polyfill behaviour
* `detect.js`: A single expression or IIFE that returns true if the feature is present in the browser (and the polyfill is therefore not required), false otherwise.  If not present, polyfill cannot be gated.
* `config.json`: A config file conforming to the spec below

The config.json file may contain any of the following keys:

* `browsers`: Object, one key per browser family name (see [browser names](#browser-names)), with the value forming either a range or a list of specific versions separated by double pipes, idenitfying the versions to which the polyfill *should be applied*. See [node-semver ranges](https://github.com/npm/node-semver#ranges).
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

### Browser names

The short names should be used in the `config.json` to configure the browser
support using the `browsers` key.

| Short name | User Agent Name          |
|:----------:|:-------------------------|
| `ie`       | Internet Explorer        |
| `ie_mob`   | Internet Explorer Mobile |
| `chrome`   | Chrome                   |
| `ios_chr`  | Chrome on iOS            |
| `safari`   | Safari                   |
| `ios_saf`  | Safari on iOS            |
| `firefox`  | Firefox                  |
| `android`  | Android Browser          |
| `opera`    | Opera                    |
| `op_mob`   | Opera Mobile             |
| `op_mini`  | Opera Mini               |
| `bb`       | Blackberry               |
