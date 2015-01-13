var fs            = require('fs'),
	path          = require('path'),
	uglify        = require('uglify-js'),
	to5           = require("6to5");

var polyfillSourceFolder = path.join(__dirname, '../polyfills');
var versionsFolder = path.join(__dirname, '../polyfills/__versions');
var configuredAliases = {};
var sources = {};
var errors = [];

"use strict";

console.log('Loading sources...');

var versions = fs.readdirSync(versionsFolder);
versions.push('latest');
versions.forEach(function (version) {
	var versionBasePath = version === 'latest' ? polyfillSourceFolder : path.join(versionsFolder, version);
	sources[version] = {};
	configuredAliases[version] = {};
	fs.readdirSync(versionBasePath).forEach(function(featureName) {
		try {

			// Load the polyfill's configuration
			var polyfillPath = path.join(versionBasePath, featureName);
			var configPath = path.join(polyfillPath, 'config.json');
			if (!fs.existsSync(polyfillPath) || !fs.existsSync(configPath)) {
				return;
			}
			try {
				var config = require(configPath);
			} catch (e) {
				throw {name:"Missing or invalid config", message:"Unable to read config from "+configPath};
			}

			config.hasTests = fs.existsSync(path.join(polyfillPath, 'tests.js'));

			// Move any default variant (outside of 'variants' object, into the variant object against the 'default' key)
			// Allows for simple configuration in cases where there is only one variant
			config.variants = config.variants || {};
			if (config.browsers) {
				config.variants['default'] = {
					browsers: config.browsers,
					dependencies: config.dependencies || [],
					licence: config.licence || "",
					esversion: config.esversion || undefined
				}
				delete config.browsers;
				delete config.dependencies;
				delete config.licence;
			}

			// If there is still no default variant, create one
			if (!('default' in config.variants)) {
				config.variants.default = {
					browsers: {},
					dependencies: [],
					licence: "",
					rawSource: "/* This polyfill has no generic form, and no browser specific variant applies to the current user agent. */"
				}
			}

			// Read each variant's source into memory, and minify
			Object.keys(config.variants).forEach(function(polyfillVariant) {
				try {
					var detectPath = path.join(polyfillPath, 'detect.js');
					var v = config.variants[polyfillVariant];

					if (!v.rawSource) {
						var polyfillFile = 'polyfill' + ((polyfillVariant !== 'default') ? '-'+polyfillVariant : '') + '.js';
						var polyfillSourcePath = path.join(polyfillPath, polyfillFile);

						if (!fs.existsSync(polyfillSourcePath)) {
							throw {name:"Missing polyfill source file", message:"Path "+polyfillSourcePath+" not found"};
						}
						v.rawSource = fs.readFileSync(polyfillSourcePath, 'utf8');
					}

					// At time of writing no current browsers support the full ES6 language syntax, so for simplicity, polyfills written in ES6 will be transpiled to ES5 in all cases (also note that uglify currently cannot minify ES6 syntax).  When browsers start shipping with complete ES6 support, the ES6 source versions should be served where appropriate, which will require another set of variations on the source properties of the polyfill.  At this point it might be better to create a collection of sources with different properties, eg v.sources = [{code:'...', esVersion:6, minified:true, gated:true},{...}] etc.
					if (v.esversion && v.esversion > 5) {
						if (v.esversion === 6) {

							// Don't add a "use strict"
							var result = to5.transform(v.rawSource, { blacklist: ["useStrict"] });
							v.rawSource = result.code;
						} else {
							throw {name:"Unsupported ES version", message:"Feature "+featureName+' ('+polyfillVariant+') uses ES'+v.esversion+' but no transpiler is available for that version'};
						}
					}

					validateSource(v.rawSource, featureName+' from '+polyfillSourcePath);

					v.minSource = uglify.minify(v.rawSource, {fromString: true}).code;

					if (fs.existsSync(detectPath)) {
						v.detectSource = fs.readFileSync(detectPath, 'utf8').replace(/\s*$/, '') || null;
						validateSource("if ("+v.detectSource+") true;", featureName+' feature detect from '+detectPath);

						v.rawGatedSource = "if (!(" + v.detectSource + ")) {\n" + v.rawSource + "}\n";
						v.minGatedSource = uglify.minify(v.rawGatedSource, {fromString: true}).code;
					} else {
						v.detectSource = '';
						v.rawGatedSource = v.rawSource;
						v.minGatedSource = v.minSource;
					}

					// Add start-of-module marker comments to unminifed variants
					v.rawSource = '\n// '+featureName + '\n' + v.rawSource;
					v.rawGatedSource = '\n// '+featureName + '\n' + v.rawGatedSource;
				} catch (ex) {
					errors.push(ex);
				}
			});

			sources[version][featureName] = config;

			// Store alias names in a map for efficient lookup, mapping aliases to
			// featureNames.  An alias can map to many polyfill names. So a group
			// of polyfills can be aliased under the same name.  This is why an
			// array is created and used for the value in the map.
			if (config.aliases) {
				config.aliases.forEach(function(aliasName) {
					if (configuredAliases[version][aliasName]) {
						configuredAliases[version][aliasName].push(featureName);
					} else {
						configuredAliases[version][aliasName] = [ featureName ];
					}
				});
			}
		} catch (ex) {
			console.error(ex);
			errors.push(ex);
		}
	});
});

if (errors.length) {
	console.error(errors.length + ' error(s) encountered processing polyfill sources.');
	process.exit(1);
} else {
	console.log('Sources loaded successfully');
}


function validateSource(code, label) {
	try {
		new Function(code);
	} catch(e) {
		throw {name:"Parse error", message:"Error parsing source code for "+label, error:e};
	}
}

function Collection(version) {
	version = version || 'latest';
	if (!sources[version]) throw('Version not found');
	this.version = version;
}

Collection.prototype.polyfillExists = function(featureName) {
	return (featureName in sources[this.version]);
}

Collection.prototype.listPolyfills = function() {
	return Object.keys(sources[this.version]);
}

Collection.prototype.getPolyfill = function(featureName) {
	return sources[this.version][featureName]
};

Collection.prototype.getConfigAliases = function(featureName) {
	return configuredAliases[this.version][featureName];
};

Collection.prototype.getVersion = function() {
	return this.version;
};

module.exports = {
	getCollection: function(version) {
		return new Collection(version);
	},
	latest: new Collection('latest')
}
