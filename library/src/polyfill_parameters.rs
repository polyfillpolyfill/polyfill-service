use std::collections::{HashMap, HashSet};
use regex::Regex;
use urlencoding::decode;
use fastly::Request;

use crate::features_from_query_parameter::features_from_query_parameter;

#[allow(dead_code)]
#[derive(Clone, Default)]
pub struct PolyfillParameters {
    pub excludes: Vec<String>,
    pub features: HashMap<String, HashSet<String>>,
    pub minify: bool,
    pub callback: Option<String>,
    pub unknown: String,
    pub ua_string: String,
    pub version: String,
    pub strict: bool,
}

pub fn get_polyfill_parameters(request: &Request) -> PolyfillParameters {
    let query: HashMap<String, String> = request.get_query().unwrap();
    let path = request.get_path();
    let excludes = query
        .get("excludes")
        .map(|f| {
            decode(f).map_or_else(|_| f.to_string(), |f| f.to_string())
        })
        .unwrap_or_else(String::new);
    let features = query
        .get("features")
        .map(|f| {
            decode(f).map_or_else(|_| f.to_string(), |f| f.to_string())
        })
        .unwrap_or_else(|| "default".to_owned());
    let unknown = query
        .get("unknown").map_or_else(|| "polyfill".to_owned(), std::clone::Clone::clone);
    let version = query
        .get("version")
        .map(std::clone::Clone::clone)
        .map(|f| {
            if f.is_empty() {
                "3.111.0".to_owned()
            } else {
                f
            }
        })
        .unwrap_or_else(|| "3.111.0".to_owned());
    let callback = query
        .get("callback")
        .filter(|callback| Regex::new(r"^[\w.]+$").unwrap().is_match(callback))
        .map(std::clone::Clone::clone);
    let ua_string = query.get("ua").map(std::clone::Clone::clone).unwrap_or_else(|| {
        request
            .get_header_str("user-agent")
            .unwrap_or_default()
            .to_owned()
    });
    let flags = query
        .get("flags").map_or_else(String::new, std::clone::Clone::clone);

    let strict = query.contains_key("strict");

    return PolyfillParameters {
        excludes: if !excludes.is_empty() {
            excludes.split(',').map(std::borrow::ToOwned::to_owned).collect()
        } else {
            vec![]
        },
        features: features_from_query_parameter(&features, &flags),
        minify: path.ends_with(".min.js"),
        callback,
        unknown,
        ua_string,
        version,
        strict,
    };
}
