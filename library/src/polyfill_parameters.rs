use indexmap::{IndexMap, IndexSet};
use regex::Regex;
use serde::Serialize;
use std::collections::HashMap;
use urlencoding::decode;

use crate::features_from_query_parameter::features_from_query_parameter;

#[allow(dead_code)]
#[derive(Clone, Default, Serialize)]
pub struct PolyfillParameters {
    pub excludes: Vec<String>,
    pub features: IndexMap<String, IndexSet<String>>,
    pub minify: bool,
    pub callback: Option<String>,
    pub unknown: String,
    pub ua_string: String,
    pub version: String,
    pub strict: bool,
}

pub fn get_polyfill_parameters(request: &worker::Request) -> PolyfillParameters {
    let url = request.url().unwrap();
    let query = url
        .query_pairs()
        .into_owned()
        .collect::<HashMap<String, String>>();

    let path = url.path();
    let excludes = query.get("excludes").map_or_else(String::new, |f| {
        decode(f).map_or_else(|_| f.to_string(), |f| f.to_string())
    });
    let features = query.get("features").map_or_else(
        || "default".to_owned(),
        |f| decode(f).map_or_else(|_| f.to_string(), |f| f.to_string()),
    );
    let unknown = query
        .get("unknown")
        .map_or_else(|| "polyfill".to_owned(), std::clone::Clone::clone);
    let version = query
        .get("version")
        .map(std::clone::Clone::clone)
        .map_or_else(
            || "3.111.0".to_owned(),
            |f| {
                if f.is_empty() {
                    "3.111.0".to_owned()
                } else {
                    f
                }
            },
        );
    let callback = query
        .get("callback")
        .filter(|callback| Regex::new(r"^[\w.]+$").unwrap().is_match(callback))
        .map(std::clone::Clone::clone);
    let ua_string = query
        .get("ua")
        .map(std::clone::Clone::clone)
        .unwrap_or_else(|| {
            request
                .headers()
                .get("user-agent")
                .unwrap_or_default()
                .to_owned()
                .unwrap_or_default()
        });
    let flags = query
        .get("flags")
        .map_or_else(String::new, std::clone::Clone::clone);

    let strict = query.contains_key("strict");

    return PolyfillParameters {
        excludes: if !excludes.is_empty() {
            excludes
                .split(',')
                .map(std::borrow::ToOwned::to_owned)
                .collect()
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
