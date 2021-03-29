## Migration

### Migrating from v2 to v3

When `unknown` is set to `polyfill` and the bundle being returned is for an unknown browser, the bundle will wrap all polyfills in feature detects.

The default value for `unknown` is no longer `ignore`, it is now `polyfill`.

The version of the polyfill-library can be chosen with the `version` parameter. The default value is `latest`. If you want to use the polyfill-library that was used in v2, set `version` to `3.25.1`.

### Migrating from v1 to v2

#### Important Changes

The `libVersion` parameter is no longer supported. We no longer support using an older version of the polyfill collection with the current version of the service.  To use an older polyfill library, use the version of the project that contains the library in the state you want it (not possible if using cdn.polyfill.io/v2)

The `gated` parameter is no longer supported. Use `flags` instead.
