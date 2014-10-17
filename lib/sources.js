var fs            = require('fs'),
	path          = require('path'),
	uglify        = require('uglify-js');

var polyfillSourceFolder = path.join(__dirname, '../polyfills');
var configuredAliases = {};
var sources = {};

"use strict";


fs.readdirSync(polyfillSourceFolder).forEach(function (featureName) {

	// Load the polyfill's configuration
	var polyfillPath = path.join(polyfillSourceFolder, featureName);
	var configPath = path.join(polyfillPath, 'config.json');
	if (!fs.existsSync(polyfillPath) || !fs.existsSync(configPath)) {
		return;
	}
	var config = require(configPath);

	// Move any default variant (outside of 'variants' object, into the variant object against the 'default' key)
	// Allows for simple configuration in cases where there is only one variant
	config.variants = config.variants || {};
	if (config.browsers) {
		config.variants['default'] = {
			browsers: config.browsers,
			dependencies: config.dependencies || [],
			licence: config.licence || ""
		}
		delete config.browsers;
		delete config.dependencies;
		delete config.licence;
	}

	// Read each variant's source into memory, and minify
	Object.keys(config.variants).forEach(function(polyfillVariant) {
		var detectPath = path.join(polyfillPath, 'detect.js');
		var v = config.variants[polyfillVariant];
		v.rawSource = fs.readFileSync(path.join(polyfillPath, 'polyfill.js'), 'utf8');
		v.minSource = uglify.minify(v.rawSource, {fromString: true}).code;

		if (fs.existsSync(detectPath)) {
			v.detectSource = fs.readFileSync(detectPath, 'utf8').replace(/\s*$/, '') || null;
			v.rawGatedSource = "if (!(" + v.detectSource + ")) {\n" + v.rawSource + "}\n";
			v.minGatedSource = uglify.minify(v.rawGatedSource, {fromString: true}).code;

			// Verify the generated feature gate is valid javascript
			try {
				new Function(v.rawSourceGated);
			} catch(e) {
				console.error("Error generating feature gate for polyfill: " + featureName+'-'+polyfillVariant);
				console.error("Invalid Syntax in feature gate: '" + e.message + "'");
				console.error("The detect.js file must be a valid expression that can be inserted as the condition of an if statement");
				process.exit(1);
			}
		} else {
			v.detectSource = '';
			v.rawGatedSource = v.rawSource;
			v.minGatedSource = v.minSource;
		}
		v.rawSource = '\n// '+featureName + '\n' + v.rawSource;
		v.rawGatedSource = '\n// '+featureName + '\n' + v.rawGatedSource;
	});

	sources[featureName] = config;

	// Store alias names in a map for efficient lookup, mapping aliases to
	// featureNames.  An alias can map to many polyfill names. So a group
	// of polyfills can be aliased under the same name.  This is why an
	// array is created and used for the value in the map.
	config.aliases = config.aliases || [];
	config.aliases.forEach(function(aliasName) {
		if (configuredAliases[aliasName]) {
			configuredAliases[aliasName].push(featureName);
		} else {
			configuredAliases[aliasName] = [ featureName ];
		}
	});
});

exports.polyfillExists = function(featureName) {
	return (featureName in sources);
}

exports.listPolyfills = function() {
	return Object.keys(sources);
}

exports.getPolyfill = function(featureName) {
	return sources[featureName]
};

exports.getConfigAliases = function(featureName) {
	return configuredAliases[featureName];
}
