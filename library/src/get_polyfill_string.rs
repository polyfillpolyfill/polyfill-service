use crate::{
    old_ua::{self, OldUA},
    ua::{UserAgent, UA},
};
use chrono::Utc;
use fastly::{http::body::StreamingBody, KVStore, Body};
use indexmap::IndexSet;

use serde::Deserialize;
use std::{
    collections::{HashMap, HashSet},
    sync::OnceLock,
};
use std::{io::Read, str, sync::Mutex};

use fastly::kv_store::handle::PendingObjectStoreLookupHandle;

use crate::{polyfill_parameters::PolyfillParameters, toposort::toposort};

#[allow(dead_code)]
#[derive(Deserialize)]
struct Browsers {
    android: Option<String>,
    bb: Option<String>,
    chrome: Option<String>,
    edge: Option<String>,
    edge_mob: Option<String>,
    firefox: Option<String>,
    firefox_mob: Option<String>,
    ie: Option<String>,
    ie_mob: Option<String>,
    ios_saf: Option<String>,
    op_mini: Option<String>,
    opera: Option<String>,
    safari: Option<String>,
    samsung_mob: Option<String>,
}

#[derive(Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PolyfillConfig {
    license: Option<String>,
    dependencies: Option<Vec<String>>,
    browsers: Option<HashMap<String, String>>,
    detect_source: Option<String>,
}

static POLYFILL_SOURCE_KV_STORE: OnceLock<KVStore> = OnceLock::new();

use lazy_static::lazy_static;

lazy_static! {
    static ref POLYFILL_STORE_CACHE: Mutex<HashMap<String, Vec<u8>>> = Mutex::new(HashMap::new());
}

fn lookup(key: &str) -> Option<Vec<u8>> {
    let mut cache = POLYFILL_STORE_CACHE.lock().unwrap();
    if let Some(value) = cache.get(key) {
        Some(value.clone())
    } else {
        let polyfills = POLYFILL_SOURCE_KV_STORE
            .get_or_init(|| KVStore::open("polyfill-library").unwrap().unwrap());
        let value = polyfills.lookup(key);
        let mut value = match value {
            Err(_) | Ok(None) => return None,
            Ok(Some(value)) => value,
        };
        let mut bytes = Vec::new();
        if value.read_to_end(&mut bytes).is_err() {
            None
        } else {
            cache.insert(key.to_owned(), bytes.clone());
            Some(bytes)
        }
    }
}

fn get_polyfill_meta(store: &str, feature_name: &str) -> Option<PolyfillConfig> {
    if feature_name.is_empty() {
        return None;
    }
    let meta = lookup(&format!("/{store}/{feature_name}/meta.json"));
    let meta = match meta {
        None => return None,
        Some(meta) => meta,
    };
    serde_json::from_slice(&meta).unwrap()
}

fn get_config_aliases(store: &str, alias: &str) -> Option<Vec<String>> {
    if alias.is_empty() {
        return None;
    }
    lookup(&format!("/{store}/aliases.json")).and_then(|bytes| {
        let aliases = serde_json::from_slice::<HashMap<String, Vec<String>>>(&bytes)
            .map_err(|e| {
                panic!(
                    "failed to json parse alias: {} from store: {} error: {:#?}",
                    alias, store, e
                );
            })
            .unwrap();
        aliases.get(alias).cloned()
    })
}

#[derive(Clone, Default, Debug)]
struct FeatureProperties {
    flags: IndexSet<String>,
    comment: Option<String>,
}

#[derive(Debug)]
enum U {
    Old(OldUA),
    Current(UA),
}

impl U {
    fn is_unknown(&self) -> bool {
        match self {
            Self::Old(u) => u.is_unknown(),
            Self::Current(u) => u.is_unknown(),
        }
    }

    fn get_family(&self) -> String {
        match self {
            Self::Old(u) => u.get_family(),
            Self::Current(u) => u.get_family(),
        }
    }
    fn satisfies(&self, range: String) -> bool {
        match self {
            Self::Old(u) => u.satisfies(range),
            Self::Current(u) => u.satisfies(range),
        }
    }
}

fn remove_feature(
    feature_name: &str,
    feature_names: &mut IndexSet<String>,
    targeted_features: &mut HashMap<String, FeatureProperties>,
) -> bool {
    feature_names.remove(feature_name);
    targeted_features.remove(feature_name).is_some()
}

fn add_feature(
    feature_name: &str,
    feature_flags: IndexSet<String>,
    feature_properties: FeatureProperties,
    // comment: Option<String>,
    feature_names: &mut IndexSet<String>,
    targeted_features: &mut HashMap<String, FeatureProperties>,
) -> bool {
    let mut properties = feature_properties;
    properties.flags.extend(feature_flags);
    // println!("comment: {:#?}", comment);
    // properties.comment = match (comment.clone(), properties.comment) {
    //     (None, None) => None,
    //     (None, Some(comment)) => Some(comment),
    //     (Some(comment), None) => Some(comment),
    //     (Some(c1), Some(c2)) => Some(c1+&c2),
    // };
    feature_names.insert(feature_name.to_string());
    if let Some(f) = targeted_features.get(&feature_name.to_string()) {
        let mut f = f.clone();
        f.flags.extend(properties.flags);

        // f.comment = match (f.comment, properties.comment) {
        //     (None, None) => comment,
        //     (None, Some(comment)) => Some(comment),
        //     (Some(comment), None) => Some(comment),
        //     (Some(c1), Some(c2)) => Some(c1+&c2),
        // };
        return targeted_features
            .insert(feature_name.to_string(), f)
            .is_none();
    }
    targeted_features
        .insert(feature_name.to_string(), properties)
        .is_none()
}

fn get_polyfills(
    options: &PolyfillParameters,
    store: &str,
    version: &str,
) -> HashMap<String, FeatureProperties> {
    let ua = if version == "3.25.1" {
        U::Old(old_ua::OldUA::new(&options.ua_string))
    } else {
        U::Current(UA::new(&options.ua_string))
    };
    let mut feature_names = options.features.keys().cloned().collect::<IndexSet<_>>();
    feature_names.sort();
    let mut targeted_features: HashMap<String, FeatureProperties> = HashMap::new();
    // println!("feature_names: {:#?}", feature_names);
    let mut seen_removed: HashSet<String> = HashSet::default();
    loop {
        let mut breakk = true;
        for feature_name in feature_names.clone() {
            if options.excludes.contains(&feature_name) {
                if remove_feature(&feature_name, &mut feature_names, &mut targeted_features) {
                    breakk = false;
                    // println!("meow exclude - {}", feature_name);
                }
                continue;
            }

            let feature = targeted_features
                .get(&feature_name)
                .cloned()
                .unwrap_or_else(|| FeatureProperties {
                    flags: options
                        .features
                        .get(&feature_name)
                        .cloned()
                        .unwrap_or_default(),
                    comment: Option::default(),
                });

            let mut properties = FeatureProperties {
                flags: IndexSet::new(),
                comment: Option::default(),
            };

            // Handle alias logic here
            let alias = get_config_aliases(store, &feature_name)
                .map_or_else(Default::default, |alias| alias);

            if !alias.is_empty() {
                feature_names.remove(&feature_name);
                for aliased_feature in &alias {
                    if add_feature(
                        aliased_feature,
                        feature.flags.clone(),
                        properties.clone(),
                        // Some(format!("Alias of {feature_name}")),
                        &mut feature_names,
                        &mut targeted_features,
                    ) {
                        breakk = false;
                        // println!("meow alias {feature_name} - {aliased_feature}");
                        // println!("feature.flags {:#?}", feature.flags);
                    }
                }
                continue;
            }

            let mut targeted = feature.flags.contains("always");

            if !targeted {
                let unknown_override = options.unknown == "polyfill" && ua.is_unknown();
                if unknown_override {
                    targeted = true;
                    properties.flags.insert("gated".to_string());
                }
            }

            let Some(meta) = get_polyfill_meta(store, &feature_name) else {
                feature_names.remove(&feature_name);
                if add_feature(
                    &feature_name,
                    IndexSet::new(),
                    properties,
                    // None,
                    &mut feature_names,
                    &mut targeted_features,
                ) {
                    breakk = false;
                    // println!("meow unknown - {}", feature_name);
                }
                continue;
            };

            if !targeted {
                if let Some(browsers) = meta.browsers {
                    let is_browser_match = browsers
                        .get(&ua.get_family())
                        .map_or(false, |browser| ua.satisfies(browser.to_string()));

                    targeted = is_browser_match;
                }
            }

            if targeted {
                if feature.flags.contains("always") || !seen_removed.contains(&feature_name) {
                    seen_removed.insert(feature_name.to_string());
                    feature_names.remove(&feature_name);
                    if add_feature(
                        &feature_name,
                        feature.flags.clone(),
                        properties.clone(),
                        // None,
                        &mut feature_names,
                        &mut targeted_features,
                    ) {
                        breakk = false;
                        // println!("meow targeted - {}", feature_name);
                    }

                    if let Some(deps) = meta.dependencies {
                        for dep in &deps {
                            if add_feature(
                                dep,
                                feature.flags.clone(),
                                properties.clone(),
                                // Some(format!("Dependency of {feature_name}")),
                                &mut feature_names,
                                &mut targeted_features,
                            ) {
                                breakk = false;
                                // println!("meow dep - {}", dep);
                            }
                        }
                    }
                }
            } else {
                if targeted_features.contains_key(&feature_name) {
                    let f = targeted_features.get(&feature_name).unwrap();
                    if f.flags.contains("always") {
                        continue;
                    }
                }
                if remove_feature(&feature_name, &mut feature_names, &mut targeted_features) {
                    breakk = false;
                    // println!("meow remove - {}", feature_name);
                }
            }
        }

        if breakk {
            break;
        }
    }
    // println!("targeted_features {:#?}", targeted_features);
    targeted_features
}

pub fn get_polyfill_string(options: &PolyfillParameters, store: &str, app_version: &str) -> Body {
    let lf = if options.minify { "" } else { "\n" };
    let app_version_text = "Polyfill service v".to_owned() + app_version;
    let mut output = Body::new();
    let mut explainer_comment: Vec<String> = vec![];
    // Build a polyfill bundle of polyfill sources sorted in dependency order
    let mut targeted_features = get_polyfills(options, store, "3.111.0");
    let mut warnings: Vec<String> = vec![];
    let mut feature_nodes: Vec<String> = vec![];
    let mut feature_edges: Vec<(String, String)> = vec![];

    let t = targeted_features.clone();
    for (feature_name, feature) in &mut targeted_features {
        let polyfill = get_polyfill_meta(store, feature_name);
        match polyfill {
            Some(polyfill) => {
                feature_nodes.push(feature_name.to_string());
                if let Some(deps) = polyfill.dependencies {
                    for dep_name in deps {
                        if t.contains_key(&dep_name) {
                            feature_edges.push((dep_name, feature_name.to_string()));
                        }
                    }
                }
                let license = polyfill.license.unwrap_or_else(|| "CC0".to_owned());
                feature.comment = feature
                    .comment
                    .clone()
                    .map(|comment| format!("{feature_name}, License: {license} ({})", &comment))
                    .or_else(|| Some(format!("{feature_name}, License: {license}")));
            }
            None => warnings.push(feature_name.to_string()),
        }
    }

    feature_nodes.sort();
    feature_edges.sort_by_key(|f| f.1.to_string());

    let sorted_features = toposort(&feature_nodes, &feature_edges).unwrap();
    let m = if options.minify { "min" } else { "raw" };
    let polyfills =
        POLYFILL_SOURCE_KV_STORE.get_or_init(|| KVStore::open("polyfill-library").unwrap().unwrap());
    let mut sorted_features_bb = vec![];
    for feature_name in &sorted_features {
        sorted_features_bb.push((feature_name, polyfill_source(store, feature_name, m)));
    }
    if !options.minify {
        explainer_comment.push(app_version_text);
        explainer_comment.push("For detailed credits and licence information see https://polyfill.io.".to_owned());
        explainer_comment.push(String::new());
        let mut features: Vec<String> = options.features.keys().map(std::clone::Clone::clone).collect();
        features.sort();
        explainer_comment.push("Features requested: ".to_owned() + &features.join(","));
        explainer_comment.push(String::new());
        for feature_name in &sorted_features {
            if let Some(feature) = targeted_features.get(feature_name) {
                explainer_comment.push(format!("- {}", feature.comment.as_ref().unwrap()));
            }
        }
        if !warnings.is_empty() {
            explainer_comment.push(String::new());
            explainer_comment.push("These features were not recognised:".to_owned());
            let mut warnings = warnings
                .iter()
                .map(|s| "- ".to_owned() + s)
                .collect::<Vec<String>>();
            warnings.sort();
            explainer_comment.push(warnings.join(","));
        }
    } else {
        explainer_comment.push(app_version_text);
        explainer_comment
            .push("Disable minification (remove `.min` from URL path) for more info".to_owned());
    }
    output.write_str(format!("/* {} */\n\n", explainer_comment.join("\n * ")).as_str());
    if !sorted_features.is_empty() {
        // Outer closure hides private features from global scope
        output.write_str("(function(self, undefined) {");
        output.write_str(lf);

        // Using the graph, stream all the polyfill sources in dependency order
        for (feature_name, bb) in sorted_features_bb {
            let wrap_in_detect = targeted_features[feature_name].flags.contains("gated");
            if wrap_in_detect {
                let meta = get_polyfill_meta(store, feature_name);
                if let Some(meta) = meta {
                    if let Some(detect_source) = meta.detect_source {
                        if !detect_source.is_empty() {
                            output.write_str("if (!(");
                            output.write_str(detect_source.as_str());
                            output.write_str(")) {");
                            output.write_str(lf);
                            let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                            output.append(bb);
                            output.write_str(lf);
                            output.write_str("}");
                            output.write_str(lf);
                            output.write_str(lf);
                        } else {
                            let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                            output.append(bb);
                        }
                    } else {
                        let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                        output.append(bb);
                    }
                } else {
                    let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                    output.append(bb);
                }
            } else {
                let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                output.append(bb);
            }
        }
        // Invoke the closure, passing the global object as the only argument
        output.write_str("})");
        output.write_str(lf);
        output.write_str("('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});");
        output.write_str(lf);
    } else if !options.minify {
        output.write_str("\n/* No polyfills needed for current settings and browser */\n\n");
    }
    if let Some(callback) = &options.callback {
        output.write_str("\ntypeof ");
        output.write_str(callback);
        output.write_str("==='function' && ");
        output.write_str(callback);
        output.write_str("();");
    }
    output
}

pub fn get_polyfill_string_stream(
    mut output: StreamingBody,
    options: &PolyfillParameters,
    store: &str,
    app_version: &str,
) {
    let lf = if options.minify { "" } else { "\n" };
    let app_version_text = "Polyfill service v".to_owned() + app_version;
    let mut explainer_comment: Vec<String> = vec![];
    // Build a polyfill bundle of polyfill sources sorted in dependency order
    let mut targeted_features = get_polyfills(options, store, "3.111.0");
    let mut warnings: Vec<String> = vec![];
    let mut feature_nodes: Vec<String> = vec![];
    let mut feature_edges: Vec<(String, String)> = vec![];

    let t = targeted_features.clone();
    for (feature_name, feature) in &mut targeted_features {
        let polyfill = get_polyfill_meta(store, feature_name);
        match polyfill {
            Some(polyfill) => {
                feature_nodes.push(feature_name.to_string());
                if let Some(deps) = polyfill.dependencies {
                    for dep_name in deps {
                        if t.contains_key(&dep_name) {
                            feature_edges.push((dep_name, feature_name.to_string()));
                        }
                    }
                }
                let license = polyfill.license.unwrap_or_else(|| "CC0".to_owned());
                feature.comment = feature
                    .comment
                    .clone()
                    .map(|comment| format!("{feature_name}, License: {license} ({})", &comment))
                    .or_else(|| Some(format!("{feature_name}, License: {license}")));
            }
            None => warnings.push(feature_name.to_string()),
        }
    }

    feature_nodes.sort();
    feature_edges.sort_by_key(|f| f.1.to_string());

    let sorted_features = toposort(&feature_nodes, &feature_edges).unwrap();
    let m = if options.minify { "min" } else { "raw" };
    let polyfills = POLYFILL_SOURCE_KV_STORE
        .get_or_init(|| KVStore::open("polyfill-library").unwrap().unwrap());
    let mut sorted_features_bb = vec![];
    for feature_name in &sorted_features {
        sorted_features_bb.push((feature_name, polyfill_source(store, feature_name, m)));
    }
    explainer_comment.push(app_version_text);
    if !options.minify {
        explainer_comment.push(
            "For detailed credits and licence information see https://polyfill.io.".to_owned(),
        );
        explainer_comment.push(String::new());
        let mut features: Vec<String> = options
            .features
            .keys()
            .map(std::clone::Clone::clone)
            .collect();
        features.sort();
        explainer_comment.push("Features requested: ".to_owned() + &features.join(","));
        explainer_comment.push(String::new());
        for feature_name in &sorted_features {
            if let Some(feature) = targeted_features.get(feature_name) {
                explainer_comment.push(format!("- {}", feature.comment.as_ref().unwrap()));
            }
        }
        if !warnings.is_empty() {
            explainer_comment.push(String::new());
            explainer_comment.push("These features were not recognised:".to_owned());
            let mut warnings = warnings
                .iter()
                .map(|s| "- ".to_owned() + s)
                .collect::<Vec<String>>();
            warnings.sort();
            explainer_comment.push(warnings.join(","));
        }
    } else {
        explainer_comment
            .push("Disable minification (remove `.min` from URL path) for more info".to_owned());
    }
    output.write_str("/*\n");
    for line in explainer_comment {
        output.write_str(format!(" * {line}\n").as_str());
    }
    output.write_str("*/\n\n");
    if !sorted_features.is_empty() {
        // Outer closure hides private features from global scope
        output.write_str("(function(self, undefined) {");
        output.write_str(lf);

        // Using the graph, stream all the polyfill sources in dependency order
        for (feature_name, bb) in sorted_features_bb {
            let wrap_in_detect = targeted_features[feature_name].flags.contains("gated");
            if wrap_in_detect {
                let meta = get_polyfill_meta(store, feature_name);
                if let Some(meta) = meta {
                    if let Some(detect_source) = meta.detect_source {
                        if detect_source.is_empty() {
                            let bb = polyfills.pending_lookup_wait(bb).unwrap().expect(&format!("failed to get {} from {}", feature_name, store));
                            output.append(bb);
                        } else {
                            output.write_str("if (!(");
                            output.write_str(detect_source.as_str());
                            output.write_str(")) {");
                            output.write_str(lf);
                            let bb = polyfills.pending_lookup_wait(bb).unwrap().expect(&format!("failed to get {} from {}", feature_name, store));
                            output.append(bb);
                            output.write_str(lf);
                            output.write_str("}");
                            output.write_str(lf);
                            output.write_str(lf);
                        }
                    } else {
                        let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                        output.append(bb);
                    }
                } else {
                    let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                    output.append(bb);
                }
            } else {
                let bb = polyfills.pending_lookup_wait(bb).unwrap().unwrap();
                output.append(bb);
            }
        }
        // Invoke the closure, passing the global object as the only argument
        output.write_str("})");
        output.write_str(lf);
        output.write_str("('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});");
        output.write_str(lf);
    } else if !options.minify {
        output.write_str("\n/* No polyfills needed for current settings and browser */\n\n");
    }
    if let Some(callback) = &options.callback {
        output.write_str("\ntypeof ");
        output.write_str(callback);
        output.write_str("==='function' && ");
        output.write_str(callback);
        output.write_str("();");
    }
    output.finish().unwrap();
}

fn polyfill_source(
    store: &str,
    feature_name: &str,
    format: &str,
) -> PendingObjectStoreLookupHandle {
    let polyfills = POLYFILL_SOURCE_KV_STORE
        .get_or_init(|| KVStore::open("polyfill-library").unwrap().unwrap());
    let mut counter = 0;
    let mut message: String = String::default();
    while counter < 100 {
        let polyfill = polyfills.lookup_async(&format!("/{store}/{feature_name}/{format}.js"));
        match polyfill {
            Ok(Some(polyfill)) => {
                return polyfill;
            }
            Ok(None) => {
                let format = if format == "raw" { "min" } else { "raw" };
                return polyfill_source(store, feature_name, format);
            }
            Err(e) => {
                message = format!(
                    "trace: {} utc: {} host: {} store: {} key: {} counter: {} error: {}",
                    std::env::var("FASTLY_TRACE_ID").unwrap(),
                    Utc::now(),
                    std::env::var("FASTLY_HOSTNAME").unwrap_or_else(|_| String::new()),
                    store,
                    &format!("/{feature_name}/{format}.js"),
                    counter,
                    e
                );
                eprintln!("{message}");
                counter += 1;
            }
        }
    }
    panic!("{}", message);
}
