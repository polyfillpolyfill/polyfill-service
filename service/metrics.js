var Graphite = require('graphite');
var Measured = require('measured');

var data = Measured.createCollection('polyfill.' + (process.env.ENV_NAME || "unknown"));
var reportInterval = 5000;
var timer = null;
var graphite = null;

if (process.env.GRAPHITE_URL) {
	graphite = Graphite.createClient(process.env.GRAPHITE_URL);
	timer = setInterval(function() {
		graphite.write(flatten(data.toJSON()), function(err) {
			if (err) {
				console.error(err);
			}
		});
	}, reportInterval);
}

// This could be added to node-measured, perhaps as a static 
// Measured.flattenMetrics(instance.getJSON()), or by adding a 
// boolean arg to getJSON(). Consider making a PR.
function flatten(obj, prefix, root) {
	prefix = prefix || '';
	root = root || {};
	Object.keys(obj).forEach(function(key) {
		if (obj[key] instanceof Object) {
			flatten(obj[key], prefix+key+'.', root);
		} else {
			root[prefix+key] = obj[key];
		}
	});
	return root;
}

module.exports = data;
