# Polyfill service

[![Build
Status](https://travis-ci.org/Financial-Times/polyfill-service.svg?branch=master)](https://travis-ci.org/Financial-Times/polyfill-service)

Makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.  For usage information see the [hosted service](https://cdn.polyfill.io), which formats and displays the service API documentation located in the [docs](docs/) folder.

## Installing as a service

1. Install [git](http://git-scm.com/downloads) and [Node](http://nodejs.org) on your system
2. Clone this repository to your system (`git clone git@github.com:Financial-Times/polyfill-service.git`)
3. Run `npm install` (this will also run `grunt build` which you will need to do again if you edit any polyfills)

To run the app for **development**:

Run `grunt dev` from the root of the working tree.  This will watch your filesystem and automatically rebuild sources and restart if you make any changes to any of the app source code or polyfills.  If you change the docs, library or service (`docs`, `lib` and `service` directories) the service will be restarted.  If you change the polyfills or polyfill configs (`polyfills` directory), the polyfill sources will be recompiled before the service restarts, which makes the restart slightly slower.

By default, `grunt dev` also *deletes historic polyfills*, for a faster build.  If you want to run the service with the historic polyfill collections installed, run `grunt installcollections buildsources service watch` instead.

To run the app for **production**:

Run `npm start`.  Monitoring the process and restarting it if necessary is left to you (and PaaS platforms like Heroku do this for you) but if you need a tool to start the service in the background and ensure it continues running, consider [forever](https://github.com/nodejitsu/forever).  It doesn't watch the filesystem for changes and you won't see any console output.

In either case, once the service is running, navigate to [http://localhost:3000](http://localhost:3000) in your browser (you can configure the port, see environment configuration below).

Alternatively, deploy straight to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/Financial-Times/polyfill-service)

For an HTTP API reference, see the [hosted service documentation](http://polyfill.webservices.ft.com).

### Environment configuration

The service reads a number of environment variables when started as a service, all of which are optional:

* `PORT`: The port on which to listen for HTTP requests (default 3000)
* `FASTLY_SERVICE_ID`, `FASTLY_API_KEY`: Used to fetch and render cache hit stats on the [Usage](https://cdn.polyfill.io/v1/docs/usage) page of the hosted documentation.  If not specified, no stats will be shown.
* `PINGDOM_CHECK_ID`, `PINGDOM_API_KEY`, `PINGDOM_ACCOUNT`, `PINGDOM_USERNAME`, `PINGDOM_PASSWORD`: Used to fetch and render uptime and response time stats on the [Usage](https://cdn.polyfill.io/v1/docs/usage) page of the hosted documentation.  If not specified, no stats will be shown.
* `GRAPHITE_HOST`: Host to which to send Carbon metrics.  If not set, no metrics will be sent.
* `GRAPHITE_PORT`: Port on the `GRAPHITE_HOST` to which to send Carbon metrics (default 2002).
* `SAUCE_USER_NAME` and `SAUCE_API_KEY`: Sauce Labs credentials for grunt test tasks (not used by the service itself)
* `NODE_ENV`: Name of environment.  We use `dev`, `prod`, `ci` or `qa`.  Just used for logging.
* `ENABLE_ACCESS_LOG`: Any truthy value will enable writing an HTTP access log from Node. Useful if you are not running node behind a routing layer like nginx or heroku.

When running a grunt task, including running the service via `grunt dev` or `grunt service`, you can optionally read environment config from a file called `.env.json` in the root of the working tree.  This is a convenient way of maintaining the environment config that you need for development.  The `.env.json` file is gitignored so will not be accidentally committed.


## Using as a library

The Polyfill service can also be used as a library in NodeJS projects.  To do this:

1. Add this repo as a dependency in your package.json
   e.g. `npm install polyfill-service --save`
2. Rebuild your project using `npm install`
3. Use the API from your code

### Library API reference

#### `getPolyfillString(options)` (method)

Returns a promise of a polyfill bundle string.  Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for polyfills that should be included conditionally
* `minify`: Boolean, optional. Whether to minify the bundle
* `features`: Object, optional. An object with the features that are to be considered for polyfill inclusion. If not supplied, no features will be considered and the output will be blank. To load the default feature set, set features to `{default:{}}`.  Each feature must be an entry in the features object with the key corresponding to the name of the feature and the value an object with the following properties:
	* `flags`: Array, optional. Array of flags to apply to this feature (see below)
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

## cdn.polyfill.io deployment

Our deployment of polyfill.io uses Heroku.  Refer to the following dashboards / accounts for access (FT employees only):

* [Heroku app](https://dashboard.heroku.com/apps/ft-polyfill-service)
* [Graphite metrics](http://grafana.ft.com/dashboard/db/origami-polyfill-service)
* [Fastly account](https://app.fastly.com/#stats/service/4E1GeTez3EFH3cnwfyMAog)
