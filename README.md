Polyfill service
=====================

Makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.

For usage information see the [hosted service](polyfill-service), which formats and displays the service API documentation located in the [docs](docs/) folder.

[![Build
Status](https://circleci.com/gh/Financial-Times/polyfill-service.svg?&style=shield&circle-token=357956eb8e6bea4ae9cca8f07918b7d0851a62d1)][ci]
[![CC0 licensed](https://img.shields.io/badge/license-CC0-blue.svg)][license]


Table Of Contents
-----------------

  * [Requirements](#requirements)
  * [Running Locally](#running-locally)
  * [Configuration](#configuration)
  * [Testing](#testing)
  * [Release Process](#release-process)
  * [Deployment](#deployment)
  * [Publishing](#publishing)
  * [Monitoring](#monitoring)
  * [Library API Reference](#library-api-reference)
  * [License](#license)


Requirements
------------

Running Origami Build Service requires a few tools:
  * [Git]: For downloading the source code
  * [Node.js] 6.x and [npm] 3.x: For installing the dependencies and running the application (npm is installed with Node.js)
  * [Grunt] 0.1.x: Used for automating tasks such as testing

Running Locally
---------------

Clone the project to your system:
```sh
git clone git@github.com:Financial-Times/polyfill-service.git
```

Change into the project directory:
```sh
cd polyfill-service
```

Install the dependencies:
```sh
npm install
```

Build the polyfill sources and start the server, rebuiling and restarting whenever any changes are made to the project:
```sh
grunt dev
```


Configuration
-------------

You can configure the Polyfill service using environment variables. In development, configurations are set in `.env`. In production, these are set through Heroku config.

  * `PORT`: The port on which to listen for HTTP requests (default 3000).
  * `NODE_ENV`: Name of environment. `dev`, `prod`, `ci` or `qa`.  Just used for logging.
  * `FASTLY_SERVICE_ID`, `FASTLY_API_KEY`: Used to fetch and render cache hit stats on the [usage] page of the hosted documentation.  If not specified, no stats will be shown.
  * `PINGDOM_CHECK_ID`, `PINGDOM_API_KEY`, `PINGDOM_ACCOUNT`, `PINGDOM_USERNAME`, `PINGDOM_PASSWORD`: Used to fetch and render uptime and response time stats on the [usage] page of the hosted documentation.  If not specified, no stats will be shown.
  * `GRAPHITE_HOST`: Host to which to send Carbon metrics.  If not set, no metrics will be sent.
  * `GRAPHITE_PORT`: Port on the `GRAPHITE_HOST` to which to send Carbon metrics (default 2002).
  * `SAUCE_USER_NAME` and `SAUCE_API_KEY`: [Sauce Labs][sauce] credentials for grunt test tasks (not used by the service itself)
  * `ENABLE_ACCESS_LOG`: Any truthy value will enable writing an HTTP access log from Node. Useful if you are not running node behind a routing layer like nginx or heroku.


Testing
-------

The tests are split into tests for the service and tests for the polyfills. The polyfill tests require `SAUCE_USER_NAME` and `SAUCE_API_KEY` to be configured, view the [configuration](#configuration) section for more information.

```sh
grunt test           # run service tests and polyfill tests on a small set of browsers
grunt simplemocha    # run the service tests
grunt ci             # run the service tests and polyfills tests on a large set of browsers
```

We run the tests [on CircleCI][ci].  `grunt ci` must pass before we merge a pull request.

Release Process
---------------

 1.  The release candidate is tested with the full grunt compatgen task to generate an updated compatibility table.
 2. The commit is tagged vX.Y.Z-rcN where N is initially 1
 3. Deploy to [QA](http://qa.polyfill.io)
 4. Announce the release on twitter
 5. Wait some number of days for feedback (usually 7 days). If necessary, make fixes, increment N, and return to step 1
 6. Update package.json version and github tag with vX.Y.Z
 7. Publish to npm
 8. Push to cdn.polyfill.io


Deployment
----------

The [production][heroku-production] and [QA][heroku-qa] applications run on [Heroku].  The library is published to the public [npm] registry.

Before creating a new deployment, update the compatability table:
```sh
grunt compatgen && git commit docs/assets/compat.json -m 'update compat.json'
```

We use [Semantic Versioning][semver] to tag releases.  Only tagged releases should hit production, which ensures that the `/__about` endpoint is informative.  To tag a new release, use one of the following (this is the only time we allow a commit directly to `master`):

```sh
npm version major
npm version minor
npm version patch
```

Now you can push to GitHub:
```sh
git push && git push --tags
```

After pushing to Github, you can deploy to [QA][heroku-qa] (This command requires being executed in Bash):
```sh
npm run deploy-qa
```


Publishing
----------
To publish to the public [npm] registry, you need to be logged in to the NPM CLI.

Check if you are already logged in to NPM via the CLI:
```sh
npm whoami
```

If you are not logged in, log in to NPM:
```sh
npm login
```

Publish a new version of the package:
```sh
npm publish
```


Monitoring
----------

We use Graphite and [Grafana] to keep track of application metrics. You can view requests, bundle build duration, cache hit ratios, and memory usage. It's important after a deploy to make sure we haven't unexpectedly had an impact on these.

We also use [Pingdom] to track uptime. You should get notifications if you're a member of the Origami team.

Library API Reference
---------------------

### Using as a library

The Polyfill service can also be used as a library in NodeJS projects.  To do this:

1. Add this repo as a dependency in your package.json
   e.g. `npm install polyfill-service --save`
2. Rebuild your project using `npm install`
3. Use the API from your code

#### `getPolyfillString(options)` (method)

Returns a promise of a polyfill bundle string.  Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for polyfills that should be included conditionally
* `minify`: Boolean, optional. Whether to minify the bundle
* `features`: Object, optional. An object with the features that are to be considered for polyfill inclusion. If not supplied, no features will be considered and the output will be blank. To load the default feature set, set features to `{default:{}}`.  Each feature must be an entry in the features object with the key corresponding to the name of the feature and the value an object with the following properties:
	* `flags`: Array, optional. Array of flags to apply to this feature (see below)
* `excludes`: Array, optional. Array of features to exclude from the final bundle.
* `unknown`: String, optional. What to do when the user agent is not recognised.  Set to `polyfill` to return polyfills for all qualifying features, `ignore` to return nothing.  Defaults to `ignore`.

Flags that may be applied to polyfills are:

* `gated`: Wrap this polyfill in a feature-detect, to avoid overwriting the native implementation
* `always`: Include this polyfill regardless of the user-agent

Example:

```javascript
require('polyfill-service').getPolyfillString({
	uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
	minify: true,
	features: {
		'Element.prototype.matches': { flags: ['always', 'gated'] },
		'modernizr:es5array': {}
	}
}).then(function(bundleString) {
	console.log(bundleString);
});
```

#### `getPolyfills(options)` (method)

Returns a promise of a set of features which are configured to be applied in browsers with the specified user agent string.
Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for features that should be included conditionally
* `features`: Object, optional. An object with the features that are to be considered for polyfill inclusion. If not supplied, all default features will be considered. Each feature must be an entry in the features object with the key corresponding to the name of the feature and the value an object with the following properties:
	* `flags`: Array, optional. Array of flags to apply to this feature (see below)
* `excludes`: Array, optional. Array of features to exclude from the final bundle.

Example:

```javascript
require('polyfill-service').getPolyfills({
	uaString: 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
	features: {
		'Element.prototype.matches': { flags: ['always', 'gated'] },
		'modernizr:es5array': {}
	}
}).then(function(polyfillSet) {
	console.log(polyfillSet);
});
```

#### `listAllPolyfills()` (method)

Return a promise of an array all the polyfills as an array of strings. This list corresponds to directories and subdirectories in the `/polyfills` directory.

Example:

```javascript
require('polyfill-service').listAllPolyfills();
```

License
-------

Except where indicated in selected polyfill config files, the polyfill service codebase is licensed under the terms of the [MIT license]. Contributors must accept our [contribution terms].


[ci]: https://circleci.com/gh/Financial-Times/polyfill-service
[contribution terms]: https://github.com/Financial-Times/polyfill-service/blob/master/CONTRIBUTING.md
[Git]: https://git-scm.com/
[grafana]: http://grafana.ft.com/dashboard/db/origami-polyfill-service
[grunt]: https://www.npmjs.com/package/grunt-cli
[heroku-production]: https://dashboard.heroku.com/apps/ft-polyfill-service
[heroku-qa]: https://dashboard.heroku.com/apps/ft-polyfill-service-qa
[heroku]: https://heroku.com/
[MIT license]: https://github.com/Financial-Times/polyfill-service/blob/master/LICENSE.md
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[pingdom]: https://my.pingdom.com/reports/uptime#check=1299983
[polyfill-service]: https://cdn.polyfill.io
[sauce]: saucelabs.com
[semver]: http://semver.org/
[usage]: https://cdn.polyfill.io/v1/docs/usage
