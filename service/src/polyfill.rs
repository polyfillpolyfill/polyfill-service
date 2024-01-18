use std::time::Duration;

use fastly::{cache::core::Transaction, KVStore, Request, Response};
use polyfill_library::{
    get_polyfill_string::{get_polyfill_string, get_polyfill_string_stream},
    polyfill_parameters::get_polyfill_parameters,
};

fn parse_library_version(version: &str) -> Option<String> {
    return match version {
        "3.25.1" => Some("3.25.1".to_owned()),
        "3.27.4" => Some("3.27.4".to_owned()),
        "3.34.0" => Some("3.34.0".to_owned()),
        "3.39.0" => Some("3.39.0".to_owned()),
        "3.40.0" => Some("3.40.0".to_owned()),
        "3.41.0" => Some("3.41.0".to_owned()),
        "3.42.0" => Some("3.42.0".to_owned()),
        "3.46.0" => Some("3.46.0".to_owned()),
        "3.48.0" => Some("3.48.0".to_owned()),
        "3.50.2" => Some("3.50.2".to_owned()),
        "3.51.0" => Some("3.51.0".to_owned()),
        "3.52.0" => Some("3.52.0".to_owned()),
        "3.52.1" => Some("3.52.1".to_owned()),
        "3.52.2" => Some("3.52.2".to_owned()),
        "3.52.3" => Some("3.52.3".to_owned()),
        "3.53.1" => Some("3.53.1".to_owned()),
        "3.89.4" => Some("3.89.4".to_owned()),
        "3.96.0" => Some("3.96.0".to_owned()),
        "3.98.0" => Some("3.98.0".to_owned()),
        "3.101.0" => Some("3.101.0".to_owned()),
        "3.103.0" => Some("3.103.0".to_owned()),
        "3.104.0" => Some("3.104.0".to_owned()),
        "3.108.0" => Some("3.108.0".to_owned()),
        "3.109.0" => Some("3.109.0".to_owned()),
        "3.110.1" => Some("3.110.1".to_owned()),
        "3.111.0" => Some("3.111.0".to_owned()),
        _ => None,
    };
}

pub(crate) fn polyfill(request: &Request) {
    let parameters = get_polyfill_parameters(request);

    let library = match parse_library_version(&parameters.version) {
        Some(library) => library,
        None => {
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
    let mut res_body = res.stream_to_client();

    let is_running_locally =
        std::env::var("FASTLY_HOSTNAME").unwrap_or_else(|_| String::new()) == "localhost";
    if is_running_locally {
        get_polyfill_string_stream(res_body, &parameters, &library, &version);
        return;
    }

    let key = serde_json::to_string(&parameters).unwrap();
    let key = seahash::hash(&key.as_bytes()).to_string();

    const TTL: Duration = Duration::from_secs(31536000);
    // perform the lookup
    let lookup_tx = Transaction::lookup(("2".to_owned() + &key).into()).execute();
    match lookup_tx {
        Err(_) => {
            get_polyfill_string_stream(res_body, &parameters, &library, &version);
        }
        Ok(lookup_tx) => {
            if let Some(found) = lookup_tx.found() {
                // a cached item was found; we use it now even though it might be stale,
                // and we'll revalidate it below
                res_body.append(found.to_stream().unwrap());
                res_body.finish().unwrap();
            }
            // now we need to handle the "must insert" and "must update" cases
            else if lookup_tx.must_insert() {
                // a cached item was not found, and we've been chosen to insert it
                match lookup_tx
                    .insert(TTL)
                    // Enable purging of all objects in the cache by issuing a purge with the key "polyfill-service".
                    .surrogate_keys(["polyfill-service"])
                    // stream back the object so we can use it after inserting
                    .execute_and_stream_back()
                {
                    Err(_) => {
                        get_polyfill_string_stream(res_body, &parameters, &library, &version);
                    }
                    Ok((mut writer, found)) => {
                        let cache = KVStore::open("cache");
                        match cache {
                            Ok(Some(mut cache)) => {
                                let value = cache.lookup(&key);
                                if let Ok(Some(value)) = value {
                                    writer.append(value);
                                    writer.finish().unwrap();
                                    res_body.append(found.to_stream().unwrap());
                                    res_body.finish().unwrap();
                                } else {
                                    get_polyfill_string_stream(
                                        writer,
                                        &parameters,
                                        &library,
                                        &version,
                                    );
                                    // now we can use the item we just inserted
                                    res_body.append(found.to_stream().unwrap());
                                    res_body.finish().unwrap();
                                    cache
                                        .insert(
                                            &key,
                                            get_polyfill_string(&parameters, &library, &version),
                                        )
                                        .unwrap();
                                }
                            }
                            Ok(None) | Err(_) => {
                                get_polyfill_string_stream(writer, &parameters, &library, &version);
                                // now we can use the item we just inserted
                                res_body.append(found.to_stream().unwrap());
                                res_body.finish().unwrap();
                            }
                        }
                    }
                };
            } else if lookup_tx.must_insert_or_update() {
                // a cached item was found and used above, and now we need to perform
                // revalidation
                if lookup_tx.found().is_some() {
                    // update the stale object's metadata
                    lookup_tx.update(TTL).execute().unwrap();
                }
            }
        }
    }
}
