
# Polyfill-service &middot; [![license][license-badge]][license] [![PRs Welcome][pull-requests-badge]][contributing-guide]

## Requirements

The Polyfill-service requires a few tools:

* [Git]: For downloading the source code
* [Node.js] 8.x: For installing the dependencies and running the application.

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
cd packages/polyfill-service && npm ci && cd ../polyfill-library && npm ci && ../../
```

Build the polyfill sources and start the server, rebuilding and restarting whenever any changes are made to the project:
```sh
npm start
```


## Configuration

You can configure the Polyfill service using environment variables. In development, configurations are set in `packages/polyfill-service/.env`. In production, these are set through [CI] config.

* `PORT`: _Defaults to 3000_. The port on which to listen for HTTP requests.
* `AWS_ACCOUNT_ID`: AWS account to deploy the application to.
* `AWS_ACCESS_ID` & `AWS_ACCESS_KEY_ID`: Public keys used to deploy the application into AWS.
* `AWS_SECRET_ACCESS` & `AWS_SECRET_ACCESS_KEY`: Secret keys used to deploy the application into AWS.
* `AWS_BUNDLE_BUCKET`: Bucket used to store generated polyfill bundles.
* `AWS_ROLE`: AWS IAM Role for the application to use when running.
* `AWS_WEBSITE_BUCKET`: Bucket used to store files for the website
* `SENTRY_PUBLIC_KEY` & `SENTRY_SECRET_KEY` & `SENTRY_PROJECT_ID`: Used to create the [Sentry] DSN.
* `SENTRY_AUTH_TOKEN`: Token used to create new [Sentry] projects and releases.
* `SENTRY_ORGANISATION`: The [Sentry] organisation the [Sentry] project is contained within.
* `SENTRY_PROJECT`: Name of the project in [Sentry].
* `FASTLY_API_KEY` & `FASTLY_SERVICE_ID_PROD`: Used to fetch stats about the application from Fastly, and to deploy applications Fastly configuration.
* `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`: [Browserstack] credentials for test tasks (not used by the application itself).
* `BROWSER_TEST_CONCURRENCY`: _Defaults to 5_. The amount of browsers to use concurrently on [Browserstack]
* `CIRCLE_TOKEN`: [CircleCI][CI] token used to ensure only one CircleCI job is using Browserstack at a time.
* `COVERALLS_REPO_TOKEN`: Token used to upload code-coverage reports to [Coveralls].
* `FASTLY_SERVICE_ID_STAGING`: Fastly Service ID used for the staging envinronment.
* `KONSTRUCTOR_API_KEY`: API key used to update Polyfill.io's DNS
* `RELEASE_LOGS_API_KEY`: Used to create logs about new releases of the application into the FT's logging system.

## Testing

The tests are split into tests for the service and tests for the polyfills.

```sh
npm run test-browser-local # Start the application and run the tests for polyfills.
npm run test               # Run the appplication tests
```

We run the tests [on CircleCI][ci]. All [CI] checks must pass before we merge a pull request.

## Release process

Every merge to the master branch will trigger a release to [staging]. When ready to deploy to [production], follow these steps: 

1. Create a new release on GitHub with a semver compatible tag. This triggers [CI] to deploy the service and to publish the package to [npm].
1. Announce the release on the @polyfillio Twitter account.

## License

The polyfill service codebase is licensed under the terms of the [MIT license]. Contributors must accept our [contribution terms].


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
[Sentry]: https://sentry.io
[Browserstack]: https://browserstack.com
[semver]: http://semver.org/
[usage]: https://polyfill.io/v2/docs/usage
[Coveralls]: https://coveralls.io
[staging]: https://qa.polyfill.io