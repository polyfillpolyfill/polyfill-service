#![warn(
    clippy::all,
    clippy::pedantic,
    clippy::cargo
)]
#![allow(clippy::missing_docs_in_private_items)]
mod pages;
mod polyfill;

use crate::polyfill::polyfill;
use fastly::http::{header, Method, StatusCode};
use fastly::{Request, Response, SecretStore};
use pages::{home, privacy, terms};
use serde::Deserialize;
use std::collections::HashMap;
use std::io::Read;
use std::str;

use fastly::limits::RequestLimits;

#[derive(Deserialize)]
struct Stats {
    bandwidth: u64,
    hit_ratio: f64,
    hits: u64,
    hits_time: f64,
    http2: u64,
    http3: u64,
    ipv6: u64,
    miss: u64,
    miss_time: f64,
    requests: u64,
    tls_v10: u64,
    tls_v11: u64,
    tls_v12: u64,
    tls_v13: u64,
    avg_time: Option<f64>,
}

#[derive(Deserialize)]
struct Historic {
    data: Vec<Stats>,
}

const DAYS: u32 = 30;
fn stats() -> Option<Stats> {
    let key = SecretStore::open("polyfill")
        .ok()
        .and_then(|s| s.try_get("fastly-api-key").ok().flatten())
        .and_then(|s| Some(s.plaintext()))
        .and_then(|s| str::from_utf8(&s).and_then(|s| Ok(s.to_owned())).ok());
    match key {
        None => return None,
        Some(key) => {
            let res = Request::get(format!(
                "https://api.fastly.com/stats/service/4E1GeTez3EFH3cnwfyMAog?by=hour&from={}+days+ago",
                DAYS
            ))
            .with_header("Fastly-Key", key)
            .with_ttl(30 * 60)
            .send("fastly");
            match res {
                Err(_) => return None,
                Ok(mut res) => {
                    let mut buffer = Vec::new();
                    if let Some(mut body) = res.try_take_body() {
                        if body.read_to_end(&mut buffer).is_err() {
                            return None;
                        }
                    }

                    // read the whole file
                    let data: serde_json::Result<Historic> = serde_json::from_slice(&buffer);
                    match data {
                        Err(_) => return None,
                        Ok(data) => {
                            return data
                                .data
                                .into_iter()
                                .reduce(|mut acc, next| {
                                    acc.bandwidth += next.bandwidth;
                                    acc.hit_ratio += next.hit_ratio;
                                    acc.hits += next.hits;
                                    acc.hits_time += next.hits_time;
                                    acc.http2 += next.http2;
                                    acc.http3 += next.http3;
                                    acc.ipv6 += next.ipv6;
                                    acc.miss += next.miss;
                                    acc.miss_time += next.miss_time;
                                    acc.requests += next.requests;
                                    acc.tls_v10 += next.tls_v10;
                                    acc.tls_v11 += next.tls_v11;
                                    acc.tls_v12 += next.tls_v12;
                                    acc.tls_v13 += next.tls_v13;
                                    return acc;
                                })
                                .and_then(|mut s| {
                                    s.hit_ratio /= Into::<f64>::into(DAYS);
                                    s.hits_time /= s.hits as f64;
                                    s.miss_time /= s.miss as f64;
                                    s.avg_time = Some((s.hits_time + s.miss_time) / 2f64);
                                    return Some(s);
                                })
                        }
                    }
                }
            }
        }
    }
}

fn main() {
    fastly::init();
    RequestLimits::set_max_header_value_bytes(Some(15_000));
    let mut req = Request::from_client();
    // Log service version
    // println!(
    //     "FASTLY_SERVICE_VERSION: {}",
    //     std::env::var("FASTLY_SERVICE_VERSION").unwrap_or_else(|_| String::new())
    // );
    let url = req.get_url_str().to_owned();
    // println!("url: {}", url);
    std::panic::set_hook(Box::new(move |info| {
        eprintln!(
            "FASTLY_SERVICE_VERSION: {}\nurl: {}\n{}",
            std::env::var("FASTLY_SERVICE_VERSION").unwrap_or_else(|_| return String::new()),
            url.clone(),
            info
        );
    }));

    match req.get_method() {
        &Method::OPTIONS => {
            Response::from_status(StatusCode::OK)
            .with_header("allow", "OPTIONS, GET, HEAD")
            .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
            .send_to_client();
            return;
        }
        &Method::CONNECT
        | &Method::DELETE
        | &Method::PATCH
        | &Method::POST
        | &Method::PUT
        | &Method::TRACE => {
            Response::from_status(StatusCode::METHOD_NOT_ALLOWED)
                .with_header(header::ALLOW, "GET, HEAD")
                .with_body_text_plain("This method is not allowed\n")
                .send_to_client();
            return;
        }
        _ => {}
    };
    let mut path = req.get_path().to_owned();
    match path.as_str() {
        "/" => {
            // Response::from_status(StatusCode::PERMANENT_REDIRECT)
            // .with_header("Location", "/v3/")
            // .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable").send_to_client();

            Response::from_body(home(stats(), DAYS))
                .with_content_type(fastly::mime::TEXT_HTML_UTF_8)
                .with_header("x-compress-hint", "on")
                // Enables the cross-site scripting filter built into most modern web browsers.
                .with_header("X-XSS-Protection", "1; mode=block")
                // Prevents MIME-sniffing a response away from the declared content type.
                .with_header("X-Content-Type-Options", "nosniff")
                // The Referrer-Policy header governs which referrer information, sent in the Referer header, should be included with requests made.
                // Send a full URL when performing a same-origin request, but only send the origin of the document for other cases.
                .with_header("Referrer-Policy", "origin-when-cross-origin")
                // Ensure the site is only served over HTTPS and reduce the chances of someone performing a MITM attack.
                .with_header("Strict-Transport-Security", "max-age=31536000; includeSubdomains; preload")
                .with_header(
                    "Cache-Control",
                    "max-age=60, stale-while-revalidate=60, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/img/logo.svg" => {
            Response::from_body(include_str!("logo.svg"))
                .with_content_type(fastly::mime::IMAGE_SVG)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .send_to_client();
        }
        "/v3/terms" => {
            Response::from_body(terms())
                .with_content_type(fastly::mime::TEXT_HTML_UTF_8)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/privacy-policy" => {
            Response::from_body(privacy())
                .with_content_type(fastly::mime::TEXT_HTML_UTF_8)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/robots.txt" => {
            Response::from_status(200)
                .with_body_text_plain("User-agent: *\nDisallow:")
                .send_to_client();
        }
        "/v1" => {
            Response::from_status(StatusCode::PERMANENT_REDIRECT)
                .with_header("Location", "/v3/")
                .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable").send_to_client();
        }
        "/v3/json/library-3.101.0.json" => {
            Response::from_body(include_str!("json/library-3.101.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.103.0.json" => {
            Response::from_body(include_str!("json/library-3.103.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.104.0.json" => {
            Response::from_body(include_str!("json/library-3.104.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.108.0.json" => {
            Response::from_body(include_str!("json/library-3.108.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.109.0.json" => {
            Response::from_body(include_str!("json/library-3.109.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.110.1.json" => {
            Response::from_body(include_str!("json/library-3.110.1.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.111.0.json" => {
            Response::from_body(include_str!("json/library-3.111.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.27.4.json" => {
            Response::from_body(include_str!("json/library-3.27.4.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.34.0.json" => {
            Response::from_body(include_str!("json/library-3.34.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.39.0.json" => {
            Response::from_body(include_str!("json/library-3.39.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.40.0.json" => {
            Response::from_body(include_str!("json/library-3.40.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.41.0.json" => {
            Response::from_body(include_str!("json/library-3.41.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.42.0.json" => {
            Response::from_body(include_str!("json/library-3.42.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.46.0.json" => {
            Response::from_body(include_str!("json/library-3.46.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.48.0.json" => {
            Response::from_body(include_str!("json/library-3.48.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.50.2.json" => {
            Response::from_body(include_str!("json/library-3.50.2.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.51.0.json" => {
            Response::from_body(include_str!("json/library-3.51.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.52.0.json" => {
            Response::from_body(include_str!("json/library-3.52.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.52.1.json" => {
            Response::from_body(include_str!("json/library-3.52.1.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.52.2.json" => {
            Response::from_body(include_str!("json/library-3.52.2.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.52.3.json" => {
            Response::from_body(include_str!("json/library-3.52.3.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.53.1.json" => {
            Response::from_body(include_str!("json/library-3.53.1.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.89.4.json" => {
            Response::from_body(include_str!("json/library-3.89.4.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.96.0.json" => {
            Response::from_body(include_str!("json/library-3.96.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }
        "/v3/json/library-3.98.0.json" => {
            Response::from_body(include_str!("json/library-3.98.0.json"))
                .with_content_type(fastly::mime::APPLICATION_JSON)
                .with_header("x-compress-hint", "on")
                .with_header("surrogate-key", "website")
                .with_header(
                    "Cache-Control",
                    "max-age=86400, stale-while-revalidate=86400, stale-if-error=86400",
                )
                .send_to_client();
        }

        _ => {
            if path.starts_with("/v1/") {
                req.set_path(&(String::from("/v2") + &path[3..]));
                path = req.get_path().to_owned();
            }
            if path == "/v2/polyfill.js" || path == "/v2/polyfill.min.js" {
                req.set_path(&(String::from("/v3") + &path[3..]));

                let mut search_params: HashMap<String, String> =
                    req.get_query().unwrap_or_default();
                search_params.insert("version".to_owned(), "3.25.1".to_owned());
                if !search_params.contains_key("unknown") {
                    search_params.insert("unknown".to_owned(), "ignore".to_owned());
                }
                req.set_query(&search_params).unwrap();
                path = req.get_path().to_owned();
            }

            if path == "/v3/polyfill.min.js" || path == "/v3/polyfill.js" {
                polyfill(&req);
            } else {
                Response::from_status(StatusCode::NOT_FOUND).with_body("Not Found")
                .with_header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800, immutable")
                .send_to_client();
            }
        }
    }
}
