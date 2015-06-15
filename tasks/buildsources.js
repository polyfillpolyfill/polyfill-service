'use strict';

function validateSource(code, label) {
	try {
		new Function(code);
	} catch(e) {
		throw {name:"Parse error", message:"Error parsing source code for "+label, error:e};
	}
}


module.exports = function(grunt) {
	var fs = require('fs');
	var path = require('path');
	var uglify = require('uglify-js');
	var to5 = require("babel-core");

	grunt.registerTask('buildsources', 'Build minified polyfill sources', function() {

		var polyfillSourceFolder = path.join(__dirname, '../polyfills');
		var versionsFolder = path.join(__dirname, '../polyfills/__versions');
		var configuredAliases = {};
		var sources = {};
		var errors = [];
		var ignoredErrors = 0;

		grunt.log.writeln('Loading sources...');

		var versions = ['latest'];
		try {
			var prevVersions = fs.readdirSync(versionsFolder);
			versions = versions.concat(prevVersions);
		} catch(e) {
			grunt.log.writeln('To install historic polyfill collections, run `grunt installcollections` (see docs for the `libVersion` argument for more details)');
		}

		versions.forEach(function (version) {
			var versionBasePath = version === 'latest' ? polyfillSourceFolder : path.join(versionsFolder, version);
			if (!fs.lstatSync(versionBasePath).isDirectory() && !fs.lstatSync(versionBasePath).isSymbolicLink()) {
				return true;
			}

			sources[version] = {};
			configuredAliases[version] = {};
			fs.readdirSync(versionBasePath).forEach(function(featureName) {
				var config;
				try {

					// Load the polyfill's configuration
					var polyfillPath = path.join(versionBasePath, featureName);
					var configPath = path.join(polyfillPath, 'config.json');
					if (!fs.existsSync(polyfillPath) || !fs.existsSync(configPath)) {
						return;
					}
					try {
						config = require(configPath);
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
							license: config.license || "",
							esversion: config.esversion || undefined
						};
						delete config.browsers;
						delete config.dependencies;
						delete config.license;
					}
					if (config.licence) {
						throw 'Incorrect spelling of license property in '+featureName;
					}

					// If there is still no default variant, create one
					if (!('default' in config.variants)) {
						config.variants.default = {
							browsers: {},
							dependencies: [],
							license: "",
							rawSource: "/* This polyfill has no generic form, and no browser specific variant applies to the current user agent. */"
						};
					}

					// Read each variant's source into memory, and minify
					Object.keys(config.variants).forEach(function(polyfillVariant) {
						var detectPath, v, polyfillFile, polyfillSourcePath;
						try {
							detectPath = path.join(polyfillPath, 'detect.js');
							v = config.variants[polyfillVariant];

							if (v.licence) {
								throw 'Incorrect spelling of license property in '+featureName;
							}

							if (!v.rawSource) {
								polyfillFile = 'polyfill' + ((polyfillVariant !== 'default') ? '-'+polyfillVariant : '') + '.js';
								polyfillSourcePath = path.join(polyfillPath, polyfillFile);

								if (!fs.existsSync(polyfillSourcePath)) {
									throw {name:"Missing polyfill source file", message:"Path "+polyfillSourcePath+" not found"};
								}
								v.rawSource = fs.readFileSync(polyfillSourcePath, 'utf8');
							}

							// At time of writing no current browsers support the full ES6 language syntax, so for simplicity, polyfills written in ES6 will be transpiled to ES5 in all cases (also note that uglify currently cannot minify ES6 syntax).  When browsers start shipping with complete ES6 support, the ES6 source versions should be served where appropriate, which will require another set of variations on the source properties of the polyfill.  At this point it might be better to create a collection of sources with different properties, eg v.sources = [{code:'...', esVersion:6, minified:true},{...}] etc.
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
							} else {
								v.detectSource = '';
							}

							// Add start-of-module marker comments to unminifed source
							v.rawSource = '\n// '+featureName + '\n' + v.rawSource;
						} catch (ex) {
							if (version === 'latest') {
								console.error(ex);
								errors.push(ex);
							} else {
								ignoredErrors++;
							}
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
					if (version === 'latest') {
						console.error(ex);
						errors.push(ex);
					} else {
						ignoredErrors++;
					}
				}
			});
		});

		if (errors.length) {
			console.error(errors.length + ' error(s) encountered in current polyfill sources.');
			process.exit(1);
		} else {

			// Ignore errors in historic versions, because they can't be fixed
			if (ignoredErrors) {
				grunt.log.writeln('Ignored '+ignoredErrors+' error(s) in historic polyfill versions');
			}

			var sourcesFD = fs.openSync(path.join(__dirname, '../polyfills/sources.json'), 'w');
			fs.writeSync(sourcesFD, JSON.stringify(sources));
			fs.fsyncSync(sourcesFD);
			fs.closeSync(sourcesFD);
			var aliasesFD = fs.openSync(path.join(__dirname, '../polyfills/aliases.json'), 'w');
			fs.writeSync(aliasesFD, JSON.stringify(configuredAliases));
			fs.fsyncSync(aliasesFD);
			fs.closeSync(aliasesFD);

			grunt.log.writeln('Sources built successfully');
		}
	});
};
