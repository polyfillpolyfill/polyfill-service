use std::collections::{HashMap, HashSet};
use std::iter::FromIterator;

pub fn features_from_query_parameter(
    features_parameter: &str,
    flags_parameter: &str,
) -> HashMap<String, HashSet<String>> {
    let mut features: Vec<&str> = features_parameter
        .split(',')
        .filter(|f| !f.is_empty())
        .collect();
    features.sort();
    let global_flags: Vec<&str> = flags_parameter.split(',').collect();
    let mut features_with_flags: HashMap<String, HashSet<String>> = HashMap::new();

    for feature in features {
        // Eliminate XSS vuln
        let safe_feature = feature.replace("*/", "");
        let mut things: Vec<&str> = safe_feature.split('|').collect();
        let name = things.remove(0);
        things.append(&mut global_flags.clone());
        let feature_specific_flags = things.into_iter().map(|f| f.to_owned());
        features_with_flags.insert(
            name.replace('?', ""),
            HashSet::from_iter(feature_specific_flags),
        );
    }

    if features_with_flags.contains_key("all") {
        features_with_flags.insert("default".to_owned(), features_with_flags["all"].clone());
        features_with_flags.remove("all");
    }

    features_with_flags
}
