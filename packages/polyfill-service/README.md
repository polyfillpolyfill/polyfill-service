
# Polyfill-service

## Configuration

You can configure the Polyfill service using environment variables. Instead of using environment variables, you can create a file named `packages/polyfill-service/.env` which contains the configuration.

* `PORT`: _Defaults to 8080_. The port on which to listen for HTTP requests.
* `FASTLY_API_KEY` & `FASTLY_SERVICE_ID`: Used to fetch stats about the application from Fastly on the home page. If these are not set, the stats will not be shown.

## Testing

The tests are split into tests for the service and tests for the polyfills.

```sh
npm run test-polyfills # Run the tests for polyfills using BrowserStack
npm run test-unit      # Run the appplication tests
```
## License

The polyfill service codebase is licensed under the terms of the [MIT license]. Contributors must accept our [contribution terms].

[contribution terms]: https://polyfill.io/v2/docs/contributing#contribution-terms
[Git]: https://git-scm.com/
[MIT license]: https://github.com/Financial-Times/polyfill-service/blob/master/LICENSE.md
[Node.js]: https://nodejs.org/
