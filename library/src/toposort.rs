use std::{collections::{HashMap, HashSet}, convert::TryInto};

pub fn toposort(
    nodes: &Vec<String>,
    edges: &Vec<(String, String)>,
) -> Result<Vec<String>, String> {
    let mut cursor = nodes.len();
    let mut sorted: Vec<String> = vec![String::new(); cursor];
    let mut visited: HashSet<u32> = HashSet::new();
    let mut i = cursor.try_into().expect("Unexpected u32 overflow in i");
    let outgoing_edges = make_outgoing_edges(edges);
    let nodes_hash = make_nodes_hash(nodes);

    for edge in edges {
        if !nodes_hash.contains_key(&edge.0) || !nodes_hash.contains_key(&edge.1) {
            return Err(
                "Unknown node. There is an unknown node in the supplied edges.".to_string(),
            );
        }
    }

    while i > 0 {
        i -= 1;
        if !visited.contains(&i) {
            let node = nodes.get::<usize>(i.try_into().expect("Unexpected usize overflow in i"));
            let node = node.unwrap().to_string();
            visit(
                node,
                i,
                &mut HashSet::new(),
                &mut visited,
                &outgoing_edges,
                &nodes_hash,
                &mut sorted,
                &mut cursor,
            )?;
        }
    }

    Ok(sorted)
}

#[allow(clippy::too_many_arguments)]
fn visit(
    node: String,
    i: u32,
    predecessors: &mut HashSet<String>,
    visited: &mut HashSet<u32>,
    outgoing_edges: &HashMap<String, Vec<String>>,
    nodes_hash: &HashMap<String, usize>,
    sorted: &mut Vec<String>,
    cursor: &mut usize,
) -> Result<(), String> {
    if predecessors.contains(&node) {
        let node_rep = format!(", node was: {node}");
        return Err(format!("Cyclic dependency{node_rep}"));
    }

    if !nodes_hash.contains_key(&node) {
        return Err(format!(
            "Found unknown node. Make sure to provide all involved nodes. Unknown node: {node}"
        ));
    }

    if visited.contains(&i) {
        return Ok(());
    }
    visited.insert(i);

    let outgoing = outgoing_edges.get(&node).unwrap_or(&Vec::new()).clone();
    let outgoing: Vec<String> = outgoing;

    let mut i = outgoing.len();
    if i > 0 {
        predecessors.insert(node.clone());
        while i > 0 {
            i -= 1;
            let child = outgoing.get(i).unwrap();
            visit(
                child.to_string(),
                (*nodes_hash.get(child).unwrap()).try_into().expect("Unexpected u32 overflow in i"),
                predecessors,
                visited,
                outgoing_edges,
                nodes_hash,
                sorted,
                cursor,
            )?;
        }
        predecessors.remove(&node);
    }

    sorted[*cursor - 1] = node;
    *cursor -= 1;

    Ok(())
}

fn make_outgoing_edges(arr: &Vec<(String, String)>) -> HashMap<String, Vec<String>> {
    let mut edges: HashMap<String, Vec<String>> = HashMap::new();
    for edge in arr {
        edges
            .entry(edge.0.clone())
            .or_insert_with(Vec::new)
            .push(edge.1.clone());
        edges.entry(edge.1.clone()).or_insert_with(Vec::new);
    }
    edges
}

fn make_nodes_hash(arr: &[String]) -> HashMap<String, usize> {
    let mut res: HashMap<String, usize> = HashMap::new();
    for (i, node) in arr.iter().enumerate() {
        res.insert(node.to_string(), i);
    }
    res
}

#[cfg(test)]
mod tests {
    use crate::toposort::{make_nodes_hash, make_outgoing_edges, toposort};

    #[test]
    fn test_toposort() {
        let feature_nodes: Vec<String> = vec![
            "Array.from".into(),
            "Array.isArray".into(),
            "Array.of".into(),
            "Array.prototype.every".into(),
            "Array.prototype.fill".into(),
            "Array.prototype.filter".into(),
            "Array.prototype.forEach".into(),
            "Array.prototype.includes".into(),
            "Array.prototype.indexOf".into(),
            "Array.prototype.lastIndexOf".into(),
            "Array.prototype.map".into(),
            "Array.prototype.reduce".into(),
            "Array.prototype.reduceRight".into(),
            "Array.prototype.some".into(),
            "CustomEvent".into(),
            "DOMTokenList".into(),
            "Date.now".into(),
            "Date.prototype.toISOString".into(),
            "DocumentFragment".into(),
            "DocumentFragment.prototype.append".into(),
            "DocumentFragment.prototype.prepend".into(),
            "Element".into(),
            "Element.prototype.after".into(),
            "Element.prototype.append".into(),
            "Element.prototype.before".into(),
            "Element.prototype.classList".into(),
            "Element.prototype.cloneNode".into(),
            "Element.prototype.closest".into(),
            "Element.prototype.matches".into(),
            "Element.prototype.prepend".into(),
            "Element.prototype.remove".into(),
            "Element.prototype.replaceWith".into(),
            "Event".into(),
            "Event.focusin".into(),
            "Event.hashchange".into(),
            "Function.prototype.bind".into(),
            "JSON".into(),
            "Map".into(),
            "Node.prototype.contains".into(),
            "Node.prototype.isSameNode".into(),
            "Number.isNaN".into(),
            "Object.assign".into(),
            "Object.create".into(),
            "Object.defineProperties".into(),
            "Object.defineProperty".into(),
            "Object.freeze".into(),
            "Object.getOwnPropertyDescriptor".into(),
            "Object.getOwnPropertyNames".into(),
            "Object.getPrototypeOf".into(),
            "Object.isExtensible".into(),
            "Object.keys".into(),
            "Promise".into(),
            "Set".into(),
            "String.prototype.endsWith".into(),
            "String.prototype.includes".into(),
            "String.prototype.startsWith".into(),
            "String.prototype.trim".into(),
            "Symbol".into(),
            "Symbol.iterator".into(),
            "Symbol.species".into(),
            "Symbol.toStringTag".into(),
            "URL".into(),
            "Window".into(),
            "XMLHttpRequest".into(),
            "_DOMTokenList".into(),
            "_ESAbstract.ArrayCreate".into(),
            "_ESAbstract.ArraySpeciesCreate".into(),
            "_ESAbstract.Call".into(),
            "_ESAbstract.Construct".into(),
            "_ESAbstract.CreateDataProperty".into(),
            "_ESAbstract.CreateDataPropertyOrThrow".into(),
            "_ESAbstract.CreateIterResultObject".into(),
            "_ESAbstract.CreateMethodProperty".into(),
            "_ESAbstract.Get".into(),
            "_ESAbstract.GetIterator".into(),
            "_ESAbstract.GetMethod".into(),
            "_ESAbstract.GetPrototypeFromConstructor".into(),
            "_ESAbstract.GetV".into(),
            "_ESAbstract.HasOwnProperty".into(),
            "_ESAbstract.HasProperty".into(),
            "_ESAbstract.IsArray".into(),
            "_ESAbstract.IsCallable".into(),
            "_ESAbstract.IsConstructor".into(),
            "_ESAbstract.IsRegExp".into(),
            "_ESAbstract.IteratorClose".into(),
            "_ESAbstract.IteratorComplete".into(),
            "_ESAbstract.IteratorNext".into(),
            "_ESAbstract.IteratorStep".into(),
            "_ESAbstract.IteratorValue".into(),
            "_ESAbstract.OrdinaryCreateFromConstructor".into(),
            "_ESAbstract.OrdinaryToPrimitive".into(),
            "_ESAbstract.RequireObjectCoercible".into(),
            "_ESAbstract.SameValueNonNumber".into(),
            "_ESAbstract.SameValueZero".into(),
            "_ESAbstract.ToBoolean".into(),
            "_ESAbstract.ToInteger".into(),
            "_ESAbstract.ToLength".into(),
            "_ESAbstract.ToObject".into(),
            "_ESAbstract.ToPrimitive".into(),
            "_ESAbstract.ToPropertyKey".into(),
            "_ESAbstract.ToString".into(),
            "_ESAbstract.TrimString".into(),
            "_ESAbstract.Type".into(),
            "_mutation".into(),
            "atob".into(),
            "document".into(),
            "document.querySelector".into(),
            "document.visibilityState".into(),
            "location.origin".into(),
            "requestAnimationFrame".into(),
            "~html5-elements".into(),
        ];
        let feature_edges: Vec<(String, String)> = vec![
            ("_ESAbstract.IsCallable".into(), "Array.from".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.from".into(),
            ),
            ("_ESAbstract.GetMethod".into(), "Array.from".into()),
            ("Symbol.iterator".into(), "Array.from".into()),
            ("_ESAbstract.IsConstructor".into(), "Array.from".into()),
            ("_ESAbstract.Construct".into(), "Array.from".into()),
            ("_ESAbstract.ArrayCreate".into(), "Array.from".into()),
            ("_ESAbstract.GetIterator".into(), "Array.from".into()),
            ("_ESAbstract.IteratorClose".into(), "Array.from".into()),
            ("_ESAbstract.ToString".into(), "Array.from".into()),
            ("_ESAbstract.IteratorStep".into(), "Array.from".into()),
            ("_ESAbstract.IteratorValue".into(), "Array.from".into()),
            ("_ESAbstract.Call".into(), "Array.from".into()),
            (
                "_ESAbstract.CreateDataPropertyOrThrow".into(),
                "Array.from".into(),
            ),
            ("_ESAbstract.ToObject".into(), "Array.from".into()),
            ("_ESAbstract.ToLength".into(), "Array.from".into()),
            ("_ESAbstract.Get".into(), "Array.from".into()),
            ("Map".into(), "Array.from".into()),
            ("Set".into(), "Array.from".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.isArray".into(),
            ),
            ("_ESAbstract.IsArray".into(), "Array.isArray".into()),
            ("_ESAbstract.CreateMethodProperty".into(), "Array.of".into()),
            ("_ESAbstract.IsConstructor".into(), "Array.of".into()),
            ("_ESAbstract.Construct".into(), "Array.of".into()),
            ("_ESAbstract.ArrayCreate".into(), "Array.of".into()),
            ("_ESAbstract.ToString".into(), "Array.of".into()),
            (
                "_ESAbstract.CreateDataPropertyOrThrow".into(),
                "Array.of".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.every".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.every".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.every".into(),
            ),
            ("_ESAbstract.Get".into(), "Array.prototype.every".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.every".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.every".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.every".into(),
            ),
            (
                "_ESAbstract.ToBoolean".into(),
                "Array.prototype.every".into(),
            ),
            ("_ESAbstract.Call".into(), "Array.prototype.every".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.fill".into(),
            ),
            ("_ESAbstract.ToObject".into(), "Array.prototype.fill".into()),
            ("_ESAbstract.ToLength".into(), "Array.prototype.fill".into()),
            ("_ESAbstract.Get".into(), "Array.prototype.fill".into()),
            (
                "_ESAbstract.ToInteger".into(),
                "Array.prototype.fill".into(),
            ),
            ("_ESAbstract.ToString".into(), "Array.prototype.fill".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.filter".into(),
            ),
            ("_ESAbstract.Get".into(), "Array.prototype.filter".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.ArraySpeciesCreate".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.ToBoolean".into(),
                "Array.prototype.filter".into(),
            ),
            ("_ESAbstract.Call".into(), "Array.prototype.filter".into()),
            (
                "_ESAbstract.CreateDataPropertyOrThrow".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.filter".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.forEach".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.forEach".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.forEach".into(),
            ),
            ("_ESAbstract.Get".into(), "Array.prototype.forEach".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.forEach".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.forEach".into(),
            ),
            ("_ESAbstract.Call".into(), "Array.prototype.forEach".into()),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.forEach".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.includes".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.includes".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.includes".into(),
            ),
            ("_ESAbstract.Get".into(), "Array.prototype.includes".into()),
            (
                "_ESAbstract.ToInteger".into(),
                "Array.prototype.includes".into(),
            ),
            (
                "_ESAbstract.SameValueZero".into(),
                "Array.prototype.includes".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.includes".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.indexOf".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.indexOf".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.indexOf".into(),
            ),
            ("_ESAbstract.Get".into(), "Array.prototype.indexOf".into()),
            (
                "_ESAbstract.ToInteger".into(),
                "Array.prototype.indexOf".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.indexOf".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.indexOf".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.Get".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.ToInteger".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.lastIndexOf".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.map".into(),
            ),
            ("_ESAbstract.ToObject".into(), "Array.prototype.map".into()),
            ("_ESAbstract.ToLength".into(), "Array.prototype.map".into()),
            ("_ESAbstract.Get".into(), "Array.prototype.map".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.map".into(),
            ),
            (
                "_ESAbstract.ArraySpeciesCreate".into(),
                "Array.prototype.map".into(),
            ),
            ("_ESAbstract.ToString".into(), "Array.prototype.map".into()),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.map".into(),
            ),
            ("_ESAbstract.Call".into(), "Array.prototype.map".into()),
            (
                "_ESAbstract.CreateDataPropertyOrThrow".into(),
                "Array.prototype.map".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.reduce".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.reduce".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.reduce".into(),
            ),
            ("_ESAbstract.Get".into(), "Array.prototype.reduce".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.reduce".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.reduce".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.reduce".into(),
            ),
            ("_ESAbstract.Call".into(), "Array.prototype.reduce".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.ToLength".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.Get".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.Call".into(),
                "Array.prototype.reduceRight".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Array.prototype.some".into(),
            ),
            ("_ESAbstract.ToObject".into(), "Array.prototype.some".into()),
            ("_ESAbstract.ToLength".into(), "Array.prototype.some".into()),
            ("_ESAbstract.Get".into(), "Array.prototype.some".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "Array.prototype.some".into(),
            ),
            ("_ESAbstract.ToString".into(), "Array.prototype.some".into()),
            (
                "_ESAbstract.HasProperty".into(),
                "Array.prototype.some".into(),
            ),
            (
                "_ESAbstract.ToBoolean".into(),
                "Array.prototype.some".into(),
            ),
            ("_ESAbstract.Call".into(), "Array.prototype.some".into()),
            ("Event".into(), "CustomEvent".into()),
            ("_DOMTokenList".into(), "DOMTokenList".into()),
            ("Object.create".into(), "DocumentFragment".into()),
            (
                "document".into(),
                "DocumentFragment.prototype.append".into(),
            ),
            (
                "DocumentFragment".into(),
                "DocumentFragment.prototype.append".into(),
            ),
            ("Element".into(), "DocumentFragment.prototype.append".into()),
            (
                "_mutation".into(),
                "DocumentFragment.prototype.append".into(),
            ),
            (
                "document".into(),
                "DocumentFragment.prototype.prepend".into(),
            ),
            (
                "DocumentFragment".into(),
                "DocumentFragment.prototype.prepend".into(),
            ),
            (
                "Element".into(),
                "DocumentFragment.prototype.prepend".into(),
            ),
            (
                "_mutation".into(),
                "DocumentFragment.prototype.prepend".into(),
            ),
            ("document".into(), "Element".into()),
            ("document".into(), "Element.prototype.after".into()),
            ("Element".into(), "Element.prototype.after".into()),
            (
                "Array.prototype.indexOf".into(),
                "Element.prototype.after".into(),
            ),
            ("_mutation".into(), "Element.prototype.after".into()),
            ("document".into(), "Element.prototype.append".into()),
            ("Element".into(), "Element.prototype.append".into()),
            ("_mutation".into(), "Element.prototype.append".into()),
            ("document".into(), "Element.prototype.before".into()),
            ("Element".into(), "Element.prototype.before".into()),
            (
                "Array.prototype.indexOf".into(),
                "Element.prototype.before".into(),
            ),
            ("_mutation".into(), "Element.prototype.before".into()),
            ("DOMTokenList".into(), "Element.prototype.classList".into()),
            ("Element".into(), "Element.prototype.classList".into()),
            (
                "Object.defineProperty".into(),
                "Element.prototype.classList".into(),
            ),
            ("Element".into(), "Element.prototype.cloneNode".into()),
            (
                "Element.prototype.matches".into(),
                "Element.prototype.closest".into(),
            ),
            ("Element".into(), "Element.prototype.matches".into()),
            (
                "document.querySelector".into(),
                "Element.prototype.matches".into(),
            ),
            ("document".into(), "Element.prototype.prepend".into()),
            ("Element".into(), "Element.prototype.prepend".into()),
            ("_mutation".into(), "Element.prototype.prepend".into()),
            ("document".into(), "Element.prototype.remove".into()),
            ("Element".into(), "Element.prototype.remove".into()),
            ("_mutation".into(), "Element.prototype.remove".into()),
            ("document".into(), "Element.prototype.replaceWith".into()),
            ("Element".into(), "Element.prototype.replaceWith".into()),
            ("_mutation".into(), "Element.prototype.replaceWith".into()),
            ("Window".into(), "Event".into()),
            ("document".into(), "Event".into()),
            ("Element".into(), "Event".into()),
            ("Object.defineProperty".into(), "Event".into()),
            ("Array.prototype.indexOf".into(), "Event".into()),
            ("Array.prototype.includes".into(), "Event".into()),
            ("Event".into(), "Event.focusin".into()),
            ("Event".into(), "Event.hashchange".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Function.prototype.bind".into(),
            ),
            (
                "_ESAbstract.IsCallable".into(),
                "Function.prototype.bind".into(),
            ),
            ("_ESAbstract.CreateMethodProperty".into(), "Map".into()),
            ("_ESAbstract.CreateIterResultObject".into(), "Map".into()),
            ("_ESAbstract.GetMethod".into(), "Map".into()),
            ("_ESAbstract.GetIterator".into(), "Map".into()),
            ("_ESAbstract.IsCallable".into(), "Map".into()),
            ("_ESAbstract.IteratorClose".into(), "Map".into()),
            ("_ESAbstract.IteratorComplete".into(), "Map".into()),
            ("_ESAbstract.IteratorNext".into(), "Map".into()),
            ("_ESAbstract.IteratorStep".into(), "Map".into()),
            ("_ESAbstract.IteratorValue".into(), "Map".into()),
            (
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
                "Map".into(),
            ),
            ("_ESAbstract.SameValueZero".into(), "Map".into()),
            ("_ESAbstract.Type".into(), "Map".into()),
            ("Array.isArray".into(), "Map".into()),
            ("Symbol".into(), "Map".into()),
            ("Symbol.iterator".into(), "Map".into()),
            ("Symbol.species".into(), "Map".into()),
            ("Object.create".into(), "Map".into()),
            ("Object.defineProperty".into(), "Map".into()),
            ("Object.isExtensible".into(), "Map".into()),
            ("Element".into(), "Node.prototype.contains".into()),
            ("Element".into(), "Node.prototype.isSameNode".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Number.isNaN".into(),
            ),
            ("_ESAbstract.Type".into(), "Number.isNaN".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.assign".into(),
            ),
            ("_ESAbstract.Get".into(), "Object.assign".into()),
            ("_ESAbstract.ToObject".into(), "Object.assign".into()),
            (
                "Object.getOwnPropertyDescriptor".into(),
                "Object.assign".into(),
            ),
            ("Object.keys".into(), "Object.assign".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.create".into(),
            ),
            ("_ESAbstract.Type".into(), "Object.create".into()),
            ("Object.defineProperties".into(), "Object.create".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.defineProperties".into(),
            ),
            ("_ESAbstract.Get".into(), "Object.defineProperties".into()),
            (
                "_ESAbstract.ToObject".into(),
                "Object.defineProperties".into(),
            ),
            ("_ESAbstract.Type".into(), "Object.defineProperties".into()),
            ("Object.keys".into(), "Object.defineProperties".into()),
            (
                "Object.getOwnPropertyDescriptor".into(),
                "Object.defineProperties".into(),
            ),
            (
                "Object.defineProperty".into(),
                "Object.defineProperties".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.freeze".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.getOwnPropertyDescriptor".into(),
            ),
            (
                "_ESAbstract.HasOwnProperty".into(),
                "Object.getOwnPropertyDescriptor".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Object.getOwnPropertyDescriptor".into(),
            ),
            (
                "_ESAbstract.ToPropertyKey".into(),
                "Object.getOwnPropertyDescriptor".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "Object.getOwnPropertyDescriptor".into(),
            ),
            (
                "Function.prototype.bind".into(),
                "Object.getOwnPropertyDescriptor".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.getOwnPropertyNames".into(),
            ),
            (
                "_ESAbstract.ToObject".into(),
                "Object.getOwnPropertyNames".into(),
            ),
            ("Object.keys".into(), "Object.getOwnPropertyNames".into()),
            (
                "Array.prototype.includes".into(),
                "Object.getOwnPropertyNames".into(),
            ),
            (
                "Array.prototype.indexOf".into(),
                "Object.getOwnPropertyNames".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.getPrototypeOf".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.isExtensible".into(),
            ),
            ("_ESAbstract.Type".into(), "Object.isExtensible".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "Object.keys".into(),
            ),
            ("Symbol.toStringTag".into(), "Promise".into()),
            ("_ESAbstract.CreateMethodProperty".into(), "Set".into()),
            ("_ESAbstract.CreateIterResultObject".into(), "Set".into()),
            ("_ESAbstract.GetMethod".into(), "Set".into()),
            ("_ESAbstract.GetIterator".into(), "Set".into()),
            ("_ESAbstract.IsCallable".into(), "Set".into()),
            ("_ESAbstract.IteratorClose".into(), "Set".into()),
            ("_ESAbstract.IteratorComplete".into(), "Set".into()),
            ("_ESAbstract.IteratorNext".into(), "Set".into()),
            ("_ESAbstract.IteratorStep".into(), "Set".into()),
            ("_ESAbstract.IteratorValue".into(), "Set".into()),
            (
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
                "Set".into(),
            ),
            ("_ESAbstract.SameValueZero".into(), "Set".into()),
            ("Array.isArray".into(), "Set".into()),
            ("Symbol".into(), "Set".into()),
            ("Symbol.iterator".into(), "Set".into()),
            ("Symbol.species".into(), "Set".into()),
            ("Object.create".into(), "Set".into()),
            ("Object.defineProperty".into(), "Set".into()),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "String.prototype.endsWith".into(),
            ),
            (
                "_ESAbstract.RequireObjectCoercible".into(),
                "String.prototype.endsWith".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "String.prototype.endsWith".into(),
            ),
            (
                "_ESAbstract.IsRegExp".into(),
                "String.prototype.endsWith".into(),
            ),
            (
                "_ESAbstract.ToInteger".into(),
                "String.prototype.endsWith".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "String.prototype.includes".into(),
            ),
            (
                "_ESAbstract.RequireObjectCoercible".into(),
                "String.prototype.includes".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "String.prototype.includes".into(),
            ),
            (
                "_ESAbstract.IsRegExp".into(),
                "String.prototype.includes".into(),
            ),
            (
                "_ESAbstract.ToInteger".into(),
                "String.prototype.includes".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "String.prototype.startsWith".into(),
            ),
            (
                "_ESAbstract.RequireObjectCoercible".into(),
                "String.prototype.startsWith".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "String.prototype.startsWith".into(),
            ),
            (
                "_ESAbstract.IsRegExp".into(),
                "String.prototype.startsWith".into(),
            ),
            (
                "_ESAbstract.ToInteger".into(),
                "String.prototype.startsWith".into(),
            ),
            (
                "_ESAbstract.CreateMethodProperty".into(),
                "String.prototype.trim".into(),
            ),
            (
                "_ESAbstract.TrimString".into(),
                "String.prototype.trim".into(),
            ),
            ("Array.prototype.forEach".into(), "Symbol".into()),
            ("Array.prototype.filter".into(), "Symbol".into()),
            ("Array.prototype.map".into(), "Symbol".into()),
            ("Object.create".into(), "Symbol".into()),
            ("Object.defineProperty".into(), "Symbol".into()),
            ("Object.getOwnPropertyNames".into(), "Symbol".into()),
            ("Object.getOwnPropertyDescriptor".into(), "Symbol".into()),
            ("Object.freeze".into(), "Symbol".into()),
            ("Object.keys".into(), "Symbol".into()),
            ("_ESAbstract.Type".into(), "Symbol".into()),
            ("Object.defineProperty".into(), "Symbol.iterator".into()),
            ("Symbol".into(), "Symbol.iterator".into()),
            ("Object.defineProperty".into(), "Symbol.species".into()),
            ("Symbol".into(), "Symbol.species".into()),
            ("Object.defineProperty".into(), "Symbol.toStringTag".into()),
            ("Symbol".into(), "Symbol.toStringTag".into()),
            ("Object.defineProperties".into(), "URL".into()),
            ("Array.prototype.forEach".into(), "URL".into()),
            ("Array.isArray".into(), "URL".into()),
            ("Array.from".into(), "URL".into()),
            ("Symbol.iterator".into(), "URL".into()),
            ("Event".into(), "XMLHttpRequest".into()),
            ("Object.defineProperty".into(), "_DOMTokenList".into()),
            ("Array.prototype.forEach".into(), "_DOMTokenList".into()),
            (
                "_ESAbstract.IsArray".into(),
                "_ESAbstract.ArraySpeciesCreate".into(),
            ),
            (
                "_ESAbstract.ArrayCreate".into(),
                "_ESAbstract.ArraySpeciesCreate".into(),
            ),
            (
                "_ESAbstract.Get".into(),
                "_ESAbstract.ArraySpeciesCreate".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.ArraySpeciesCreate".into(),
            ),
            (
                "_ESAbstract.IsConstructor".into(),
                "_ESAbstract.ArraySpeciesCreate".into(),
            ),
            (
                "_ESAbstract.Construct".into(),
                "_ESAbstract.ArraySpeciesCreate".into(),
            ),
            (
                "_ESAbstract.IsConstructor".into(),
                "_ESAbstract.Construct".into(),
            ),
            (
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
                "_ESAbstract.Construct".into(),
            ),
            (
                "Function.prototype.bind".into(),
                "_ESAbstract.Construct".into(),
            ),
            (
                "Object.defineProperty".into(),
                "_ESAbstract.CreateDataProperty".into(),
            ),
            (
                "_ESAbstract.CreateDataProperty".into(),
                "_ESAbstract.CreateDataPropertyOrThrow".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.CreateIterResultObject".into(),
            ),
            (
                "_ESAbstract.CreateDataProperty".into(),
                "_ESAbstract.CreateIterResultObject".into(),
            ),
            (
                "Object.defineProperty".into(),
                "_ESAbstract.CreateMethodProperty".into(),
            ),
            ("_ESAbstract.Call".into(), "_ESAbstract.GetIterator".into()),
            (
                "_ESAbstract.GetMethod".into(),
                "_ESAbstract.GetIterator".into(),
            ),
            ("_ESAbstract.GetV".into(), "_ESAbstract.GetIterator".into()),
            ("_ESAbstract.Type".into(), "_ESAbstract.GetIterator".into()),
            ("Object.create".into(), "_ESAbstract.GetIterator".into()),
            ("Symbol.iterator".into(), "_ESAbstract.GetIterator".into()),
            ("_ESAbstract.GetV".into(), "_ESAbstract.GetMethod".into()),
            (
                "_ESAbstract.IsCallable".into(),
                "_ESAbstract.GetMethod".into(),
            ),
            (
                "_ESAbstract.Get".into(),
                "_ESAbstract.GetPrototypeFromConstructor".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.GetPrototypeFromConstructor".into(),
            ),
            ("_ESAbstract.ToObject".into(), "_ESAbstract.GetV".into()),
            (
                "_ESAbstract.GetMethod".into(),
                "_ESAbstract.IsConstructor".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.IsConstructor".into(),
            ),
            ("_ESAbstract.Type".into(), "_ESAbstract.IsRegExp".into()),
            (
                "_ESAbstract.ToBoolean".into(),
                "_ESAbstract.IsRegExp".into(),
            ),
            ("_ESAbstract.Get".into(), "_ESAbstract.IsRegExp".into()),
            (
                "_ESAbstract.Call".into(),
                "_ESAbstract.IteratorClose".into(),
            ),
            (
                "_ESAbstract.GetMethod".into(),
                "_ESAbstract.IteratorClose".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.IteratorClose".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.IteratorComplete".into(),
            ),
            (
                "_ESAbstract.ToBoolean".into(),
                "_ESAbstract.IteratorComplete".into(),
            ),
            (
                "_ESAbstract.Get".into(),
                "_ESAbstract.IteratorComplete".into(),
            ),
            ("_ESAbstract.Type".into(), "_ESAbstract.IteratorNext".into()),
            ("_ESAbstract.Call".into(), "_ESAbstract.IteratorNext".into()),
            (
                "_ESAbstract.IteratorNext".into(),
                "_ESAbstract.IteratorStep".into(),
            ),
            (
                "_ESAbstract.IteratorComplete".into(),
                "_ESAbstract.IteratorStep".into(),
            ),
            ("_ESAbstract.Get".into(), "_ESAbstract.IteratorValue".into()),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.IteratorValue".into(),
            ),
            (
                "_ESAbstract.GetPrototypeFromConstructor".into(),
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
            ),
            (
                "Object.create".into(),
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
            ),
            (
                "Object.defineProperty".into(),
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
            ),
            (
                "Object.getPrototypeOf".into(),
                "_ESAbstract.OrdinaryCreateFromConstructor".into(),
            ),
            (
                "_ESAbstract.Call".into(),
                "_ESAbstract.OrdinaryToPrimitive".into(),
            ),
            (
                "_ESAbstract.Get".into(),
                "_ESAbstract.OrdinaryToPrimitive".into(),
            ),
            (
                "_ESAbstract.IsCallable".into(),
                "_ESAbstract.OrdinaryToPrimitive".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.OrdinaryToPrimitive".into(),
            ),
            (
                "_ESAbstract.SameValueNonNumber".into(),
                "_ESAbstract.SameValueZero".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.SameValueZero".into(),
            ),
            ("_ESAbstract.Type".into(), "_ESAbstract.ToInteger".into()),
            (
                "_ESAbstract.ToInteger".into(),
                "_ESAbstract.ToLength".into(),
            ),
            ("_ESAbstract.Call".into(), "_ESAbstract.ToPrimitive".into()),
            (
                "_ESAbstract.GetMethod".into(),
                "_ESAbstract.ToPrimitive".into(),
            ),
            (
                "_ESAbstract.OrdinaryToPrimitive".into(),
                "_ESAbstract.ToPrimitive".into(),
            ),
            ("_ESAbstract.Type".into(), "_ESAbstract.ToPrimitive".into()),
            (
                "_ESAbstract.ToPrimitive".into(),
                "_ESAbstract.ToPropertyKey".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "_ESAbstract.ToPropertyKey".into(),
            ),
            (
                "_ESAbstract.Type".into(),
                "_ESAbstract.ToPropertyKey".into(),
            ),
            (
                "_ESAbstract.ToPrimitive".into(),
                "_ESAbstract.ToString".into(),
            ),
            ("_ESAbstract.Type".into(), "_ESAbstract.ToString".into()),
            (
                "_ESAbstract.RequireObjectCoercible".into(),
                "_ESAbstract.TrimString".into(),
            ),
            (
                "_ESAbstract.ToString".into(),
                "_ESAbstract.TrimString".into(),
            ),
            ("document".into(), "_mutation".into()),
            ("Element".into(), "_mutation".into()),
            ("Element".into(), "document.querySelector".into()),
            ("document".into(), "document.querySelector".into()),
            ("CustomEvent".into(), "document.visibilityState".into()),
            ("Object.defineProperties".into(), "location.origin".into()),
            ("Date.now".into(), "requestAnimationFrame".into()),
            ("document".into(), "~html5-elements".into()),
        ];

        let a = make_outgoing_edges(&feature_edges);
        let b = make_outgoing_edges(&feature_edges);
        assert_eq!(a, b);

        let a = make_nodes_hash(&feature_nodes);
        let b = make_nodes_hash(&feature_nodes);
        assert_eq!(a, b);

        let a = toposort(&feature_nodes, &feature_edges).unwrap();
        let b = toposort(&feature_nodes, &feature_edges).unwrap();
        assert_eq!(a, b);
    }
}
