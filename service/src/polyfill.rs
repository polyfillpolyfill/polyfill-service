use std::time::Duration;

use chrono::Utc;
use fastly::{Request, Response, cache::simple::{get, get_or_set_with, CacheEntry}};
use http::StatusCode;
use polyfill_library::{polyfill_parameters::get_polyfill_parameters, get_polyfill_string::get_polyfill_string};

pub(crate) fn polyfill(request: &Request) -> Response {
    let parameters = get_polyfill_parameters(request);

    let library = match parameters.version.as_str() {
        "3.25.1" => "polyfill-library-3.25.1",
        "3.27.4" => "polyfill-library-3.27.4",
        "3.34.0" => "polyfill-library-3.34.0",
        "3.39.0" => "polyfill-library-3.39.0",
        "3.40.0" => "polyfill-library-3.40.0",
        "3.41.0" => "polyfill-library-3.41.0",
        "3.42.0" => "polyfill-library-3.42.0",
        "3.46.0" => "polyfill-library-3.46.0",
        "3.48.0" => "polyfill-library-3.48.0",
        "3.50.2" => "polyfill-library-3.50.2",
        "3.51.0" => "polyfill-library-3.51.0",
        "3.52.0" => "polyfill-library-3.52.0",
        "3.52.1" => "polyfill-library-3.52.1",
        "3.52.2" => "polyfill-library-3.52.2",
        "3.52.3" => "polyfill-library-3.52.3",
        "3.53.1" => "polyfill-library-3.53.1",
        "3.89.4" => "polyfill-library-3.89.4",
        "3.96.0" => "polyfill-library-3.96.0",
        "3.98.0" => "polyfill-library-3.98.0",
        "3.101.0" => "polyfill-library-3.101.0",
        "3.103.0" => "polyfill-library-3.103.0",
        "3.104.0" => "polyfill-library-3.104.0",
        "3.108.0" => "polyfill-library-3.108.0",
        "3.109.0" => "polyfill-library-3.109.0",
        "3.110.1" => "polyfill-library-3.110.1",
        "3.111.0" => "polyfill-library-3.111.0",
        _ => {
            return Response::from_status(400)
            .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
            .with_body("requested version does not exist");
        }
    };
    let version = parameters.version.clone();
    let is_running_locally =
        std::env::var("FASTLY_HOSTNAME").unwrap_or_else(|_| String::new()) == "localhost";
    let bundle = if !is_running_locally {
        let fastly_service_version = std::env::var("FASTLY_SERVICE_VERSION").unwrap();
        let key = fastly_service_version + &request.get_url_str().to_owned();
        let bundle = get(key.clone());
        match bundle {
            Ok(Some(bundle)) => bundle,
            _ => {
                let bundle = get_polyfill_string(&parameters, library, &version).into_bytes();
                match get_or_set_with(
                    key,
                    || {
                        Ok(CacheEntry {
                            value: bundle.clone().into(),
                            ttl: Duration::from_secs(u64::MAX),
                        })
                    },
                ) {
                    Ok(Some(bundle)) => bundle,
                    Ok(None) => bundle.into(),
                    Err(e) => {
                        let message = format!(
                            "trace: {} utc: {} host: {} error: {}",
                            std::env::var("FASTLY_TRACE_ID").unwrap(),
                            Utc::now(),
                            std::env::var("FASTLY_HOSTNAME").unwrap_or_else(|_| String::new()),
                            e.to_string()
                        );
                        eprintln!("{}", message);
                        bundle.into()
                    },
                }
            },
        }
    } else {
        get_polyfill_string(&parameters, library, &version)
    };
    Response::from_body(bundle)
        .with_header("Access-Control-Allow-Origin", "*")
        .with_header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS")
        .with_header("X-Compress-Hint", "on")
        .with_header("Content-Type", "text/javascript; charset=UTF-8")
        .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
}
