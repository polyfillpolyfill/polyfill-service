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
	var babel = require("babel-core");
	var mkdir = require('mkdirp').sync;

	grunt.registerTask('buildsources', 'Build polyfill sources', function() {

		var polyfillSourceFolder = path.join(__dirname, '../polyfills');
		var configuredAliases = {};
		var errors = [];
		var dirs = [];
		var destFolder = path.join(__dirname, '../polyfills/__dist');

		grunt.log.writeln('Writing compiled polyfill sources to '+destFolder+'/...');

		mkdir(destFolder);

		// Recursively discover all subfolders and build into a list (__-prefixed directories are not polyfill features)
		function scanDir(dir) {
			fs.readdirSync(dir).forEach(function(item) {
				var d = path.join(dir, item);
				if (fs.lstatSync(d).isDirectory() && item.indexOf('__') !== 0) {
					scanDir(d);
					dirs.push(d);
				}
			});
		}
		scanDir(polyfillSourceFolder);

		dirs.forEach(function(polyfillPath) {
			var config;
			var configPath = path.join(polyfillPath, 'config.json');
			var detectPath = path.join(polyfillPath, 'detect.js');
			var polyfillSourcePath = path.join(polyfillPath, 'polyfill.js');
			var featureName = polyfillPath.substr(polyfillSourceFolder.length+1).replace(/\//g, '.');

			try {

				// Load the polyfill's configuration
				try {
					if (!fs.existsSync(configPath)) return;
					config = JSON.parse(fs.readFileSync(configPath));
					config.baseDir = path.relative(path.join(__dirname,'../polyfills'), polyfillPath);
				} catch (e) {
					throw {name:"Invalid config", message:"Unable to read config from "+configPath};
				}

				config.hasTests = fs.existsSync(path.join(polyfillPath, 'tests.js'));

				if (config.licence) {
					throw 'Incorrect spelling of license property in '+featureName;
				}

				if (!config.rawSource) {
					polyfillSourcePath = path.join(polyfillPath, 'polyfill.js');

					if (!fs.existsSync(polyfillSourcePath)) {
						throw {name:"Missing polyfill source file", message:"Path "+polyfillSourcePath+" not found"};
					}
					config.rawSource = fs.readFileSync(polyfillSourcePath, 'utf8');
				}

				// At time of writing no current browsers support the full ES6 language syntax, so for simplicity, polyfills written in ES6 will be transpiled to ES5 in all cases (also note that uglify currently cannot minify ES6 syntax).  When browsers start shipping with complete ES6 support, the ES6 source versions should be served where appropriate, which will require another set of variations on the source properties of the polyfill.  At this point it might be better to create a collection of sources with different properties, eg config.sources = [{code:'...', esVersion:6, minified:true},{...}] etc.
				if (config.esversion && config.esversion > 5) {
					if (config.esversion === 6) {
						var result = babel.transform(config.rawSource, {"presets": ["es2015"]});

						// Don't add a "use strict"
						// Super annoying to have to drop the preset and list all babel plugins individually, so hack to remove the "use strict" added by Babel (see also http://stackoverflow.com/questions/33821312/how-to-remove-global-use-strict-added-by-babel)
						config.rawSource = result.code.replace(/^\s*"use strict";\s*/i, '');

					} else {
						throw {name:"Unsupported ES version", message:"Feature "+featureName+' ('+polyfillVariant+') uses ES'+v.esversion+' but no transpiler is available for that version'};
					}
				}

				if (config.build && config.build.minify === false) {
					// skipping any validation or minification process since
					// the raw source is supposed to be production ready.
					config.minSource = config.rawSource;
				} else {
					validateSource(config.rawSource, featureName+' from '+polyfillSourcePath);
					config.minSource = uglify.minify(config.rawSource, {fromString: true}).code;
				}

				if (fs.existsSync(detectPath)) {
					config.detectSource = fs.readFileSync(detectPath, 'utf8').replace(/\s*$/, '') || null;
					validateSource("if ("+config.detectSource+") true;", featureName+' feature detect from '+detectPath);
				} else {
					config.detectSource = '';
				}

				// Add start-of-module marker comments to unminifed source
				config.rawSource = '\n// '+featureName + '\n' + config.rawSource;

				var featurePath = path.join(destFolder, featureName+'.json');
				var featureDir = path.dirname(featurePath);
				mkdir(featureDir, function(err) {
					if (!err) {
						fs.writeFileSync(featurePath, JSON.stringify(config));
					}
					else {
						grunt.log.writenln("Can't create directory " + featureDir + "due to the following error: " + err);
					}    
				});                    
				fs.writeFileSync(featurePath, JSON.stringify(config));
				grunt.log.writeln('+ '+featureName);

				// Store alias names in a map for efficient lookup, mapping aliases to
				// featureNames.  An alias can map to many polyfill names. So a group
				// of polyfills can be aliased under the same name.  This is why an
				// array is created and used for the value in the map.
				if (config.aliases) {
					config.aliases.forEach(function(aliasName) {
						if (configuredAliases[aliasName]) {
							configuredAliases[aliasName].push(featureName);
						} else {
							configuredAliases[aliasName] = [ featureName ];
						}
					});
				}
			} catch (ex) {
				console.error(ex);
				errors.push(ex);
			}
		});

		if (errors.length) {
			console.error(errors.length + ' error(s) encountered parsing polyfill sources.');
			process.exit(1);
		} else {
			fs.writeFileSync(path.join(__dirname, '../polyfills/__dist/aliases.json'), JSON.stringify(configuredAliases));
			grunt.log.writeln('Sources built successfully');
		}
	});
};
