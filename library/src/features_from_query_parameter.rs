use indexmap::{IndexMap, IndexSet};


#[must_use] pub fn features_from_query_parameter(
    features_parameter: &str,
    flags_parameter: &str,
) -> IndexMap<String, IndexSet<String>> {
    let mut features: Vec<&str> = features_parameter
        .split(',')
        .filter(|f| !f.is_empty())
        .collect();
    features.sort_unstable();
    let global_flags: Vec<&str> = flags_parameter.split(',').collect();
    let mut features_with_flags: IndexMap<String, IndexSet<String>> = IndexMap::new();

    for feature in features {
        // Eliminate XSS vuln
        let safe_feature = feature.replace("*/", "");
        let mut things: Vec<&str> = safe_feature.split('|').collect();
        let name = things.remove(0);
        things.append(&mut global_flags.clone());
        let feature_specific_flags = things.into_iter().map(std::borrow::ToOwned::to_owned);
        features_with_flags.insert(
            name.replace('?', ""),
            feature_specific_flags.collect::<IndexSet<_>>(),
        );
    }

    if features_with_flags.contains_key("all") {
        features_with_flags.insert("default".to_owned(), features_with_flags["all"].clone());
        features_with_flags.remove("all");
    }

    features_with_flags
}
