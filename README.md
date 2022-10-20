# Polyfill.io API
> The fork of the [Financial-Times/polyfill-service](https://github.com/Financial-Times/polyfill-service) to bring some optimizations.

## Differences
* Deps revision: only the latest version of the [polyfill-library@3](https://github.com/Financial-Times/polyfill-library) is used, so `node_modules` size is about 1/7 of the original — 471M vs 3.4G.
* Node.js 18 instead of 12
* Moved to yarn
* Ability to use ENV variables to allow access by CORS for the domain itself and subdomains
```shell
ALLOWED_DOMAINS=google.com,localhost # <-- must be first level domains
```

## License

Polyfill.io is licensed under the terms of the [MIT license](./LICENSE.md).
