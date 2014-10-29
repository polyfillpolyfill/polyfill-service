# Contributors' guide

The polyfill service is a community resource, designed for everyone, and welcomes contributions from everyone.

## Contribution rewards

We want to encourage more people to get involved in the polyfill service, so the Financial Times is pleased to offer one month's free premium access to all FT content (normally $50) to anyone who has a pull request merged in this repository.  [Claim your free access](https://docs.google.com/a/ft.com/forms/d/1aykPiYBwqKpKY6nvGVi43wOU_5epr3XLgE00Vi52SMQ/viewform).


## Contributing to polyfills

Polyfills are located in the `/polyfills` directory and organised by feature name.  Each polyfill directory is structured like this:

* `polyfill.js`: Required. Code to apply the polyfill behaviour.  See [polyfill authoring guidelines](#polyfill-authoring-guidelines).
* `polyfill-{variant}.js`: Optional alternative polyfills, to be used where different browsers require different polyfill implementations in order to produce the same result.  Often this is because some browsers have a prefixed or part-implemented/buggy version of the feature which can be normalised more easily and efficiently than recreating it from lower level primitives.  The variant name is arbitrary, but conventionally it is the short form of the browser name and version, if applicable, eg `polyfill-ie7.js`.  The variant name 'default' is reserved for `polyfill.js`.
* `detect.js`: A single expression that returns true if the feature is present in the browser (and the polyfill is therefore not required), false otherwise.  Can be an IIFE.  If not present, polyfill cannot be gated (wrapped in a feature-detect).
* `tests.js`: A set of tests written using [mocha](http://mochajs.org/) and [expect](https://github.com/LearnBoost/expect.js/), to test the feature.  See [test authoring guidelines](#test-authoring-guidelines).
* `config.json`: A config file conforming to the spec below

The config.json file may contain any of the following keys:

* `browsers`: Object, one key per browser family name (see [browser support](#browser-support)), with the value forming either a range or a list of specific versions separated by double pipes, idenitfying the versions to which the polyfill *should be applied*. See [node-semver ranges](https://github.com/npm/node-semver#ranges).
* `aliases`: Array, a list of alternate names for referencing the polyfill.  In the example Modernizr names are explicitly namespaced.
* `dependencies`: Array, a list of canonical polyfill names for polyfills that must be included prior to this one.
* `author`: Object, metadata about the author of the polyfill, following [NPM convention](https://www.npmjs.org/doc/json.html#people-fields-author-contributors)
* `licence`: String, an [SPDX](https://spdx.org/licenses/) identifier for an [OSI Approved](http://opensource.org/licenses/alphabetical) license  (Or CC0 which is GPL compatible)
* `variants`: Object, mapping variant names to objects with individual `browsers`, `licence`, `author` and `dependencies` properties.

Where a config file contains `browsers`, `licence`, `author` or `dependencies` properties outside of a `variants` object, those properties are interpreted as belonging to the `default` variant, and apply to the `polyfil.js` implementation.  Placing them inside `variants.default` is allowed, but optional.

Example:

```json
{
	"browsers": {
		"ie": "6 - 9",
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

### Polyfill authoring guidelines

Polyfill source files (`polyfill[-variant].js`) are not expected to always be perfect implementations of the features they are filling.  However, it's important that we observe some strict guidelines to avoid making native implementations harder to ship. Therefore polyfill sources must meet the following requirements:

* Must only make changes that create conformance with a published specification
* Must not be wrapped in a feature detect (the service will add this)
* Must not contain polyfills for other features (instead, express a dependency on those polyfills, see below)


### Test authoring guidelines

Polyfill service tests use Mocha and Expect, both chosen because they work in legacy browsers down to our [baseline](#baseline-support).  The tests must assert the behaviour that the polyfill makes consistent across browsers, which is not necessarily the entire published spec.

Specifically, if part of a feature is not polyfillable in a particular browser, and yet the polyfill is still usable in that browser, omit tests for the part which cannot be polyfilled.  This ensures that the polyfill is still targeted at that browser, and consumers are able to get an accurate understanding of which parts of the feature are covered by the polyfill.  However, a comment in the test file listing aspects of the feature that are not supported is always appreciated.

### Running tests

You can run tests in three modes:

* **control**: All features qualify to be tested, but no polyfills will be loaded
* **all**: All features qualify to be tested, and polyfills will always be loaded
* **targeted**: Only those features with polyfills targeted for the current browser will be tested, and polyfills will be loaded conditionally.

The **control** and **all** modes are used to map the compatibility of polyfills, and build the [compat.json](docs/assets/compat.json) file. The **targeted** mode is used to test that the current configuration works, and is therefore used for continuous integration tests on Travis CI.

Your polyfill should pass cleanly in targeted mode in all browsers.  To run the entire test suite in a local browser, run the service, and then load the test director in the browser you're testing:

[http://127.0.0.1:3000/test/director?mode=targeted](http://127.0.0.1:3000/test/director?mode=targeted)

To run just one feature, use the test runner:

[http://127.0.0.1:3000/test/tests?feature=Array.from&mode=targeted](http://127.0.0.1:3000/test/tests?feature=Array.from&mode=targeted)

The gruntfile contains tasks to run the tests on Sauce Labs, but these require API keys that are not public.  If you have your own Sauce Labs account you can run the tests by setting the `SAUCE_API_KEY` and `SAUCE_USER_NAME` environment variables, and then run:

```
grunt ci
```


### Checklist

When contributing to polyfills, please follow this checklist to avoid lots of iteration on your pull request:

* Make sure that the polyfill correctly implements the aspects of the spec that it seeks to emulate
* Write a well defined config.json:
	* If you do not include a licence or author, we will likely ask that you do
	* Check whether there is a Modernizr feature-detect that detects this feature.  If so, add a `modernizr:`-prefixed alias
	* Make sure you write valid semver ranges for each browser (if defining a range, you need spaces around the dash) and use the correct browser name key
* Provide a feature detect if it's possible to detect the feature via a JavaScript expression
* Make sure you write a reasonably comprehensive set of tests, and that they pass in all the browsers you have targeted



## Contributing to the application

The service part of the project is pretty simple, and there are few strict conventions.  In lieu of any formal standards, try to take care to follow existing conventions.  Some of these are defined in an `.editorconfig` file.



## Browser support

The short names should be used in the `config.json` to configure the browser support using the `browsers` key.

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


### Baseline support

The polyfill service does not attempt to serve polyfills to very old browsers.  We maintain a movable baseline of browser support, which is documented in [the UA module](lib/UA.js).  If a request for a polyfill bundle comes from a UA that is below the baseline or unknown, the response will be:

```
/* Unsupported UA detected: ie/4.0.0
 * Version range for polyfill support in this family is: >=6 */
```

In practice this means that in some cases, where polyfills have configurations targeting all versions of a browser (eg `"ie": "*"`), the polyfill will actually only be available in versions of that browser above the baseline.

This feature is intended to allow simpler testing and maintenance of the service, so that the general baseline can be moved forward without having to update every polyfill config individually.
