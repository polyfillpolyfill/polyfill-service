#![warn(clippy::all, clippy::pedantic, clippy::cargo)]
#![allow(clippy::missing_docs_in_private_items)]
mod pages;
mod polyfill;

use crate::polyfill::polyfill;
use pages::home;
use std::str;
use std::sync::Arc;

pub use polyfill_library::Env;

const APPLICATION_JSON: &str = "application/json";

pub async fn handle_request(
    req: worker::Request,
    env: Arc<Env>,
) -> worker::Result<worker::Response> {
    match req.method() {
        worker::Method::Options => {
            let mut headers = worker::Headers::new();
            headers.set("allow", "OPTIONS, GET, HEAD")?;
            headers.set("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")?;

            return Ok(worker::Response::ok("")?
                .with_status(200)
                .with_headers(headers));
        }
        worker::Method::Connect
        | worker::Method::Delete
        | worker::Method::Patch
        | worker::Method::Post
        | worker::Method::Put
        | worker::Method::Trace => {
            let mut headers = worker::Headers::new();
            headers.set("allow", "GET, HEAD")?;

            return Ok(
                worker::Response::error("This method is not allowed\n", 405)?.with_headers(headers),
            );
        }
        _ => {}
    };
    let path = req.path();
    match path.as_str() {
        "/" => {
            // worker::Response::from_status(StatusCode::PERMANENT_REDIRECT)
            // .with_header("Location", "/v3/")
            // .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable").send_to_client();
            let mut headers = worker::Headers::new();

            headers.set("content-type", "text/html; charset=utf-8")?;
            headers.set("x-compress-hint", "on")?;
            // Enables the cross-site scripting filter built into most modern web browsers.
            headers.set("X-XSS-Protection", "1; mode=block")?;
            // Prevents MIME-sniffing a response away from the declared content type.
            headers.set("X-Content-Type-Options", "nosniff")?;
            // The Referrer-Policy header governs which referrer information, sent in the Referer header, should be included with requests made.
            // Send a full URL when performing a same-origin request, but only send the origin of the document for other cases.
            headers.set("Referrer-Policy", "origin-when-cross-origin")?;
            // Ensure the site is only served over HTTPS and reduce the chances of someone performing a MITM attack.
            headers.set(
                "Strict-Transport-Security",
                "max-age=31536000; includeSubdomains; preload",
            )?;
            headers.set(
                "Cache-Control",
                "max-age=60, stale-while-revalidate=60, stale-if-error=86400",
            )?;

            return Ok(worker::Response::ok(home())?.with_headers(headers));
        }
        "/img/logo.svg" => {
            let mut headers = worker::Headers::new();
            headers.set("content-type", "image/svg+xml")?;
            headers.set("x-compress-hint", "on")?;
            headers.set("surrogate-key", "website")?;

            return Ok(worker::Response::ok(include_str!("logo.svg"))?.with_headers(headers));
        }
        "/robots.txt" => {
            return worker::Response::ok("User-agent: *\nDisallow:");
        }
        // "/v1" => {
        //     worker::Response::from_status(StatusCode::PERMANENT_REDIRECT)
        //         .with_header("Location", "/v3/")
        //         .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable").send_to_client();
        // }
        // "/v3/json/library-3.101.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.101.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.103.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.103.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.104.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.104.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.108.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.108.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.109.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.109.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.110.1.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.110.1.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        "/v3/json/library-3.111.0.json" => {
            let mut headers = worker::Headers::new();
            headers.set("content-type", APPLICATION_JSON)?;
            headers.set("x-compress-hint", "on")?;
            headers.set("surrogate-key", "website")?;
            headers.set(
                "Cache-Control",
                "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
            )?;

            return Ok(
                worker::Response::ok(include_str!("json/library-3.111.0.json"))?
                    .with_headers(headers),
            );
        }
        // "/v3/json/library-3.27.4.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.27.4.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.34.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.34.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.39.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.39.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.40.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.40.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.41.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.41.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.42.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.42.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.46.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.46.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.48.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.48.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.50.2.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.50.2.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.51.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.51.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.52.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.52.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.52.1.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.52.1.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.52.2.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.52.2.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.52.3.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.52.3.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.53.1.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.53.1.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.89.4.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.89.4.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.96.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.96.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        // "/v3/json/library-3.98.0.json" => {
        //     worker::Response::from_body(include_str!("json/library-3.98.0.json"))
        //         .with_content_type(fastly::mime::APPLICATION_JSON)
        //         .with_header("x-compress-hint", "on")
        //         .with_header("surrogate-key", "website")
        //         .with_header(
        //             "Cache-Control",
        //             "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
        //         )
        //         .send_to_client();
        // }
        _ => {
            // if path.starts_with("/v1/") {
            //     req.set_path(&(String::from("/v2") + &path[3..]));
            //     path = req.get_path().to_owned();
            // }
            // if path == "/v2/polyfill.js" || path == "/v2/polyfill.min.js" {
            //     req.set_path(&(String::from("/v3") + &path[3..]));

            //     let mut search_params: HashMap<String, String> =
            //         req.get_query().unwrap_or_default();
            //     search_params.insert("version".to_owned(), "3.25.1".to_owned());
            //     if !search_params.contains_key("unknown") {
            //         search_params.insert("unknown".to_owned(), "ignore".to_owned());
            //     }
            //     req.set_query(&search_params).unwrap();
            //     path = req.get_path().to_owned();
            // }

            if path == "/v3/polyfill.min.js" || path == "/v3/polyfill.js" {
                polyfill(&req, env).await
            } else {
                let mut headers = worker::Headers::new();
                headers.set("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")?;

                return Ok(worker::Response::error(format!("{path}: Not Found"), 404)?
                    .with_headers(headers));
            }
        }
    }
}
