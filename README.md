# Polyfill service

Makes web development less frustrating by selectively polyfilling just what the browser needs. Use it on your own site, or as a service.

For usage information see the [hosted service](https://polyfill.io), which formats and displays the service API documentation located in the [docs](docs/) folder.

[![Build
Status](https://circleci.com/gh/Financial-Times/polyfill-service.svg?&style=shield&circle-token=357956eb8e6bea4ae9cca8f07918b7d0851a62d1)][ci]
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)][license]

* [Requirements](#requirements)
* [Running locally](#running-locally)
* [Configuration](#configuration)
* [Testing](#testing)
* [Real user monitoring](#real-user-monitoring)
* [polyfill.io CDN](#polyfillio-cdn)
* [Library](#library)
* [License](#license)


## Requirements

Running the polyfill service requires a few tools:

* [Git]: For downloading the source code
* [Node.js] 6.x and [npm] 3.x: For installing the dependencies and running the application (npm is installed with Node.js)

## Running locally

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

Build the polyfill sources and start the server, rebuilding and restarting whenever any changes are made to the project:
```sh
npm run dev
```


## Configuration

You can configure the Polyfill service using environment variables. In development, configurations are set in `packages/polyfill-service/.env`. In production, these are set through Heroku config.

* `PORT`: The port on which to listen for HTTP requests (default 3000).
* `NODE_ENV`: Name of environment. `dev`, `production`, `ci` or `qa`.  Just used for logging.
* `FASTLY_SERVICE_ID`, `FASTLY_SERVICE_ID_QA`, `FASTLY_API_KEY`: Used to fetch and render cache hit stats on the [usage] page of the hosted documentation, and to deploy VCL.  If not specified, no stats will be shown and VCL deploy will fail.
* `PINGDOM_CHECK_ID`, `PINGDOM_API_KEY`, `PINGDOM_ACCOUNT`, `PINGDOM_USERNAME`, `PINGDOM_PASSWORD`: Used to fetch and render uptime and response time stats on the [usage] page of the hosted documentation.  If not specified, no stats will be shown.
* `GRAPHITE_HOST`: Host to which to send Carbon metrics.  If not set, no metrics will be sent.
* `GRAPHITE_PORT`: Port on the `GRAPHITE_HOST` to which to send Carbon metrics (default 2002).
* `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`: [BrowserStack][browserstack] credentials for test tasks (not used by the service itself)
* `ENABLE_ACCESS_LOG`: Any truthy value will enable writing an HTTP access log to STDOUT from Node. Useful if you are not running node behind a routing layer like nginx or heroku.
* `RUM_MYSQL_DSN`: DSN URL for a MySQL database with the schema documented in [db-schema.sql](docs/assets/db-schema.sql). If present, RUM reporting routes will be exposed.  See [Real User Monitoring](#real-user-monitoring)
* `RUM_BEACON_HOST`: Hostname of the server to which RUM beacon requests should be sent.  See [Real User Monitoring](#real-user-monitoring)
* `SURROGATE_KEY`: The surrogate key assigned to all responses. Useful for purging cached responses from a CDN. (default `polyfill-service`);
* `SENTRY_DSN`: The data source name (DSN) to be used for sending error logs to [Sentry](https://sentry.io)
* `SENTRY_RELEASE`: An identifier for the current release to be sent to [Sentry](https://sentry.io)


## Testing

The tests are split into tests for the service and tests for the polyfills. The polyfill tests require `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` to be configured, view the [configuration](#configuration) section for more information.

```sh
npm run test-node # run the service tests
npm run ci        # run the service tests and polyfills tests on a large set of browsers
```

We run the tests [on CircleCI][ci].  `npm run ci` must pass before we merge a pull request.


## Real User Monitoring

We have shipped experimental support for using RUM to monitor feature support and performance in browsers.  This involves a number of parts, all activated by the presence `RUM_MYSQL_DSN` and `RUM_BEACON_HOST` env vars:

* **RUM client code**: a [small snippet](lib/rumTemplate.js.handlebars) of legacy-compatible code that will evaluate feature detects on the client, sample resource timing data, and beacon the results back to the service. This is shipped as part of the Node app.
* **Beacon endpoint**: an [endpoint to collect RUM data](fastly-config.vcl), terminated at the CDN, logging query data out to Amazon S3 to avoid overloading the backend.  To clarify, the backend node server does not provide a route handler for the RUM data collection URL, so this is shipped when we deploy VCL to Fastly.  It also requires log streaming to be configured in the Fastly UI.
* **Lambda processing function**: an [AWS Lambda function](tasks/lambda/functions/rum-process/index.js) is used to move the data from the raw log files on S3 into the MySQL backend.  This is shipped using a dedicated process with [Apex](http://apex.run), see below.
* **Reporting endpoints**: [API routes that deliver useful analysis of the RUM data](service/routes/rum.js) are provided in the node server.  These return CSV data intended to populate a spreadsheet.  This is shipped as part of the Node app.

Because this requires a fair amount of orchestration, we recommend only enabling it for the FT hosted version.  If you want to run the service yourself, you can opt out of this RUM feature by not setting a `RUM_MYSQL_DSN` or `RUM_BEACON_HOST`.

### Routes

* `/v2/getRumPerfData`: Return stats for resource timing metrics, grouped by CDN POP and country of request origin
* `/v2/getRumCompatData`: Return stats for differences between current targeting configuration and live feature detect results from browers, grouped by feature name, browser family and version.

### Deploying Lambda

All the bits of the RUM solution are deployed as part of our existing deployment workflow except the Lambda functions, which require [Apex](http://apex.run).  To deploy the Lambda functions:

1. Create the following 7 environment variables in your local environment or the `.env` file in the project root: `RUM_MYSQL_DSN`, `RUM_AWS_ACCESS_KEY`, `RUM_AWS_SECRET_KEY`, a second copy of each of these suffixed with `_QA`, and `RUM_AWS_REGION`. FT devs can get the correct values for these variables from Heroku config or Lastpass.
3. Run `npm run deploy-lambda` or `npm run deploy-lambda -- --env=prod` as appropriate
4. If this is the first time you've deployed the function to this AWS profile, you then need to configure the function in the AWS UI:
	- Set up a trigger to invoke the function whenever a file is written to the appropriate S3 bucket


## polyfill.io CDN

The Financial Times and Fastly host a public version of this service on [polyfill.io](https://polyfill.io).

### Release process

1. Test the release candidate with the `npm run compatgen` task to generate an updated compatibility table. - `cd packages/polyfill-service && npm run compatgen && git commit docs/assets/compat.json -m 'update compat.json'`
1. Tag the commit using npm's version command. - `npm version {premajor | preminor | prepatch}` if creating a new RC, or `npm version prerelease` if you already have an active `premajor`, `preminor` or `prepatch`.
1. Publish to npm under the `next` dist-tag. - `npm publish --tag next`
1. Push the commits and tags to the git remote. - `git push origin master --tags`
1. Deploy to [QA](https://qa.polyfill.io). - `npm run deploy`
1. Announce the release on twitter
1. Wait some number of days for feedback (usually 7 days). If necessary, make fixes and return to step 1
1. Tag the commit/package using npm's version command, using the same semver level as you used for the `pre` versions. - `npm version {major | minor | patch}`
1. Publish to npm under the `latest` dist-tag. - `npm publish`
1. Push the commits and tags to the git remote. - `git push origin master --tags`
1. Deploy to [production](https://polyfill.io). - `npm run promote`

### Monitoring

We use Graphite and [Grafana] to keep track of application metrics. You can view requests, bundle build duration, cache hit ratios, and memory usage. It's important after a deploy to make sure we haven't unexpectedly had an impact on these.

We also use [Pingdom] to track uptime. You should get notifications if you're a member of the Origami team.

## Library

### API reference

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

## License

Except where indicated in selected polyfill config files, the polyfill service codebase is licensed under the terms of the [MIT license]. Contributors must accept our [contribution terms].


[ci]: https://circleci.com/gh/Financial-Times/polyfill-service
[contribution terms]: https://polyfill.io/v2/docs/contributing#contribution-terms
[Git]: https://git-scm.com/
[grafana]: https://grafana.ft.com/dashboard/db/origami-polyfill-service
[heroku-production]: https://dashboard.heroku.com/apps/ft-polyfill-service
[heroku-qa]: https://dashboard.heroku.com/apps/ft-polyfill-service-qa
[heroku]: https://heroku.com/
[license]: https://github.com/Financial-Times/polyfill-service/blob/master/LICENSE.md
[MIT license]: https://github.com/Financial-Times/polyfill-service/blob/master/LICENSE.md
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[pingdom]: https://my.pingdom.com/reports/uptime#check=1299983
[polyfill-service]: https://polyfill.io
[browserstack]: https://browserstack.com
[semver]: http://semver.org/
[usage]: https://polyfill.io/v2/docs/usage
