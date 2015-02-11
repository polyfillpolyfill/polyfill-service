# Polyfill service

[![Build
Status](https://travis-ci.org/Financial-Times/polyfill-service.svg?branch=master)](https://travis-ci.org/Financial-Times/polyfill-service)

**polyfill** makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.  For usage information see the [hosted service](http://cdn.polyfill.io), which formats and displays the service API documentation located in the [docs](docs/) folder.

## Installing as a service

To install polyfill as a service for development:

1. Install [git](http://git-scm.com/downloads) and [Node](http://nodejs.org) on your system
2. Clone this repository to your system (`git clone git@github.com:Financial-Times/polyfill-service.git`)
3. Run `npm install` (this will also run `grunt build` which you will need to do again if you edit any polyfills)

To run the app for **development**:

Run `npm run watch` from the root of the working tree (or, if you have nodemon installed, you may prefer to use that).  This will watch your filesystem and automatically restart if you make any changes to any of the app source code.  If you change *polyfill* code, you will need to recompile the polyfills by manually running `grunt buildsources`, because it takes a few seconds.

To run the app for **production**:

Run `npm start`.  This will run the service using [forever](https://github.com/nodejitsu/forever), which runs the process in the background, monitors it and restarts it automatically if it dies.  It doesn't watch the filesystem for changes and you won't see any console output.

In either case, once the service is running, navigate to [http://localhost:3000](http://localhost:3000) in your browser

Alternatively, deploy straight to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/Financial-Times/polyfill-service)

For an HTTP API reference, see the [hosted service documentation](http://polyfill.webservices.ft.com).

### Environment configuration

The service reads a number of environment variables when started as a service:

* `PORT`: The port on which to listen for HTTP requests (default 3000)
* `FASTLY_SERVICE_ID`, `FASTLY_API_KEY`: Used to fetch and render cache hit stats on the [Usage](https://cdn.polyfill.io/v1/docs/usage) page of the hosted documentation.  If not specified, no stats will be shown.
* `PINGDOM_CHECK_ID`, `PINGDOM_API_KEY`, `PINGDOM_ACCOUNT`, `PINGDOM_USERNAME`, `PINGDOM_PASSWORD`: Used to fetch and render uptime and response time stats on the [Usage](https://cdn.polyfill.io/v1/docs/usage) page of the hosted documentation.  If not specified, no stats will be shown.
* `GRAPHITE_URL`: URL to which to send Carbon metrics, including protocol, host and port, eg `plaintext://graphite.example.org:2003/`.  If not set, no metrics will be sent.


## Using as a library

Polyfill service can also be used as a library in NodeJS projects.  To do this:

1. Add this repo as a dependency in your package.json
   e.g. `npm install polyfill-service --save`
2. Rebuild your project using `npm install`
3. Use the API from your code

### Library API reference

#### `getPolyfillString(options)` (method)

Returns a bundle of polyfills as a string.  Options is an object with the following keys:

* `uaString`: String, required. The user agent to evaluate for polyfills that should be included conditionally
* `minify`: Boolean, optional. Whether to minify the bundle
* `features`: Object, optional. An object with the features that are to be considered for polyfill inclusion. If not supplied, all default features will be considered. Each feature must be an entry in the features object with the key corresponding to the name of the feature and the value an object with the following properties:
	* `flags`: Array, optional. Array of flags to apply to this feature (see below)
* `libVersion`: String, optional. Version of the polyfill collection to use. Accepts any valid semver expression.  This is useful if you wish to synronise releases in the polyfill service with your own release process, to ensure that incompatibilities cannot cause errors in your applications without warning.  Intended for when deployed as a service.  Not generally useful in a library context.
* `unknown`: String, optional. What to do when the user agent is not recognised.  Set to `polyfill` to return default polyfill variants of all qualifying features, `ignore` to return nothing.  Defaults to `ignore`.

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
});
```

#### `getPolyfills(options)` (method)

Returns a list of features whose configuration matches the given user agent string.
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
});
```

#### `getAllPolyfills()` (method)

Return a list of all the features with polyfills as an array of strings. This
list corresponds to directories in the `/polyfills` directory.

Example:

```javascript
require('polyfill-service').getAllPolyfills();
```
