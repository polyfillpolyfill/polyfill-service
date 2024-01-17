use std::time::Duration;

use fastly::{
    cache::core::{Found, Transaction},
    http::body::StreamingBody,
    KVStore, Request, Response,
};
use polyfill_library::{
    get_polyfill_string::{get_polyfill_string, get_polyfill_string_stream},
    polyfill_parameters::{get_polyfill_parameters, PolyfillParameters},
};

pub(crate) fn polyfill(request: &Request) {
    let parameters = get_polyfill_parameters(request);

    let library = match parameters.version.as_str() {
        "3.25.1" => "3.25.1",
        "3.27.4" => "3.27.4",
        "3.34.0" => "3.34.0",
        "3.39.0" => "3.39.0",
        "3.40.0" => "3.40.0",
        "3.41.0" => "3.41.0",
        "3.42.0" => "3.42.0",
        "3.46.0" => "3.46.0",
        "3.48.0" => "3.48.0",
        "3.50.2" => "3.50.2",
        "3.51.0" => "3.51.0",
        "3.52.0" => "3.52.0",
        "3.52.1" => "3.52.1",
        "3.52.2" => "3.52.2",
        "3.52.3" => "3.52.3",
        "3.53.1" => "3.53.1",
        "3.89.4" => "3.89.4",
        "3.96.0" => "3.96.0",
        "3.98.0" => "3.98.0",
        "3.101.0" => "3.101.0",
        "3.103.0" => "3.103.0",
        "3.104.0" => "3.104.0",
        "3.108.0" => "3.108.0",
        "3.109.0" => "3.109.0",
        "3.110.1" => "3.110.1",
        "3.111.0" => "3.111.0",
        _ => {
            Response::from_status(400)
            .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
            .with_body("requested version does not exist").send_to_client();
            return;
        }
    };
    let version = parameters.version.clone();
    let mut res = Response::new();
    res.set_header("Access-Control-Allow-Origin", "*");
    res.set_header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
    res.set_header("X-Compress-Hint", "on");
    res.set_header("Content-Type", "text/javascript; charset=UTF-8");
    res.set_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable");
    // We need "Vary: User-Agent" in the browser cache because a browser
    // may update itself to a version which needs different polyfills
    // So we need to have it ignore the browser cached bundle when the user-agent changes.
    res.set_header("Vary", "User-Agent, Accept-Encoding");
    res.take_body();
    let mut sbody = res.stream_to_client();

    let is_running_locally =
        std::env::var("FASTLY_HOSTNAME").unwrap_or_else(|_| String::new()) == "localhost";
    if is_running_locally {
        get_polyfill_string_stream(sbody, &parameters, library, &version);
        return;
    }

    let key = serde_json::to_string(&parameters).unwrap();
    let key = seahash::hash(&key.as_bytes()).to_string();

    const TTL: Duration = Duration::from_secs(31536000);
    // perform the lookup
    let lookup_tx = Transaction::lookup(("2".to_owned() + &key).into())
        .execute()
        .unwrap();
    if let Some(found) = lookup_tx.found() {
        // a cached item was found; we use it now even though it might be stale,
        // and we'll revalidate it below
        sbody.append(found.to_stream().unwrap());
        sbody.finish().unwrap();
    }
    // now we need to handle the "must insert" and "must update" cases
    else if lookup_tx.must_insert() {
        // a cached item was not found, and we've been chosen to insert it
        let (mut writer, found) = lookup_tx
            .insert(TTL)
            // Enable purging of all objects in the cache by issuing a purge with the key "polyfill-service".
            .surrogate_keys(["polyfill-service"])
            // stream back the object so we can use it after inserting
            .execute_and_stream_back()
            .unwrap();

        let cache = KVStore::open("cache");
        match cache {
            Ok(Some(mut cache)) => {
                let value = cache.lookup(&key);
                if let Ok(Some(value)) = value {
                    writer.append(value);
                    writer.finish().unwrap();
                    sbody.append(found.to_stream().unwrap());
                    sbody.finish().unwrap();
                } else {
                    get_polyfill_string_stream(writer, &parameters, library, &version);
                    // now we can use the item we just inserted
                    sbody.append(found.to_stream().unwrap());
                    sbody.finish().unwrap();
                    cache
                        .insert(&key, get_polyfill_string(&parameters, library, &version))
                        .unwrap();
                }
            }
            Ok(None) | Err(_) => {
                get_polyfill_string_stream(writer, &parameters, library, &version);
                // now we can use the item we just inserted
                sbody.append(found.to_stream().unwrap());
                sbody.finish().unwrap();
            }
        }
    } else if lookup_tx.must_insert_or_update() {
        // a cached item was found and used above, and now we need to perform
        // revalidation
        if lookup_tx.found().is_some() {
            // update the stale object's metadata
            lookup_tx.update(TTL).execute().unwrap();
        }
    }
}
