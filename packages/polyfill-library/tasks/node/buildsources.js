'use strict';

const fs = require('graceful-fs');
const path = require('path');
const uglify = require('uglify-js');
const babel = require('babel-core');
const mkdirp = require('mkdirp');
const tsort = require('tsort');
const denodeify = require('denodeify');
const vm = require('vm');

const writeFile = denodeify(fs.writeFile);
const readFile = denodeify(fs.readFile);
const makeDirectory = denodeify(mkdirp);

function validateSource(code, label) {
	try {
		new vm.Script(code);
	}
	catch (error) {
		throw {
			name: "Parse error",
			message: `Error parsing source code for ${label}`,
			error
		};
	}
}

function flattenPolyfillDirectories(directory) {
	// Recursively discover all subfolders and produce a flattened list.
	// Directories prefixed with '__' are not polyfill features and are not included.
	let results = [];
	for (const item of fs.readdirSync(directory)) {
		const joined = path.join(directory, item);
		if (fs.lstatSync(joined).isDirectory() && item.indexOf('__') !== 0) {
			results = results
				.concat(flattenPolyfillDirectories(joined))
				.concat(joined);
		}
	}
	return results;
}

function checkForCircularDependencies(polyfills) {
	const graph = tsort();

	for (const polyfill of polyfills) {
		for (const dependency of polyfill.dependencies) {
			graph.add(dependency, polyfill.name);
		}
	}

	try {
		graph.sort();

		return Promise.resolve();
	}
	catch (err) {
		return Promise.reject('\nThere is a circle in the dependency graph.\nCheck the `dependencies` property of polyfill config files that have recently changed, and ensure that they do not form a circle of references.' + err);
	}
}

function checkDependenciesExist(polyfills) {

	for (const polyfill of polyfills) {
		for (const dependency of polyfill.dependencies) {
			if (!polyfills.some(function (polyfill) {
				return dependency === polyfill.name;
			})) {
				return Promise.reject(`Polyfill ${polyfill.name} depends on ${dependency}, which does not exist within the polyfill-service. Recommended to either add the missing polyfill or remove the dependency.`);
			}
		}
	}
	return Promise.resolve();
}

function writeAliasFile(polyfills, dir) {
	const aliases = {};

	for (const polyfill of polyfills) {
		for (const alias of polyfill.aliases) {
			aliases[alias] = (aliases[alias] || []).concat(polyfill.name);
		}
	}

	return writeFile(path.join(dir, 'aliases.json'), JSON.stringify(aliases));
}

class Polyfill {
	constructor(absolute, relative) {
		this.path = { absolute, relative };
		this.name = relative.replace(/(\/|\\)/g, '.');
		this.config = {};
		this.sources = {};
	}

	get aliases() {
		return this.config.aliases || [];
	}

	get dependencies() {
		return this.config.dependencies || [];
	}

	get configPath() {
		return path.join(this.path.absolute, 'config.json');
	}

	get detectPath() {
		return path.join(this.path.absolute, 'detect.js');
	}

	get sourcePath() {
		return path.join(this.path.absolute, 'polyfill.js');
	}

	get hasConfigFile() {
		return fs.existsSync(this.configPath);
	}

	updateConfig() {
		this.config.size = this.sources.min.length;
	}

	loadConfig() {
		return readFile(this.configPath)
			.catch(error => {
				throw {
					name: "Invalid config",
					message: `Unable to read config from ${this.configPath}`,
					error
				};
			})
			.then(data => {
				this.config = JSON.parse(data);
				this.config.detectSource = '';
				this.config.baseDir = this.path.relative;

				if ('licence' in this.config) {
					throw `Incorrect spelling of license property in ${this.name}`;
				}

				this.config.hasTests = fs.existsSync(path.join(this.path.absolute, 'tests.js'));
				this.config.isTestable = !('test' in this.config && 'ci' in this.config.test && this.config.test.ci === false);
				this.config.isPublic = this.name.indexOf('_') !== 0;

				if (fs.existsSync(this.detectPath)) {
					this.config.detectSource = fs.readFileSync(this.detectPath, 'utf8').replace(/\s*$/, '') || '';
					validateSource(`if (${this.config.detectSource}) true;`, `${this.name} feature detect from ${this.detectPath}`);
				}
			});
	}

	loadSources() {
		return readFile(this.sourcePath, 'utf8')
			.catch(error => {
				throw {
					name: "Invalid source",
					message: `Unable to read source from ${this.sourcePath}`,
					error
				};
			})
			.then(raw => this.transpile(raw))
			.catch(error => {
				throw {
					message: `Error transpiling ${this.name}`,
					error
				};
			})
			.then(transpiled => this.minify(transpiled))
			.catch(error => {
				throw {
					message: `Error minifying ${this.name}`,
					error
				};
			})
			.then(this.removeSourceMaps)
			.then(sources => {
				this.sources = sources;
			});
	}

	transpile(source) {
		// At time of writing no current browsers support the full ES6 language syntax,
		// so for simplicity, polyfills written in ES6 will be transpiled to ES5 in all
		// cases (also note that uglify currently cannot minify ES6 syntax).  When browsers
		// start shipping with complete ES6 support, the ES6 source versions should be served
		// where appropriate, which will require another set of variations on the source properties
		// of the polyfill.  At this point it might be better to create a collection of sources with
		// different properties, eg config.sources = [{code:'...', esVersion:6, minified:true},{...}] etc.
		if (this.config.esversion && this.config.esversion > 5) {
			if (this.config.esversion === 6) {
				const transpiled = babel.transform(source, { presets: ["es2015"] });

				// Don't add a "use strict"
				// Super annoying to have to drop the preset and list all babel plugins individually, so hack to remove the "use strict" added by Babel (see also http://stackoverflow.com/questions/33821312/how-to-remove-global-use-strict-added-by-babel)
				return transpiled.code.replace(/^\s*"use strict";\s*/i, '');

			} else {
				throw {
					name: "Unsupported ES version",
					message: `Feature ${this.name} uses ES${this.config.esversion} but no transpiler is available for that version`
				};
			}
		}

		return source;
	}

	minify(source) {
		const raw = `\n// ${this.name}\n${source}`;

		if (this.config.build && this.config.build.minify === false) {
			// skipping any validation or minification process since
			// the raw source is supposed to be production ready.
			// Add a line break in case the final line is a comment
			return { raw: raw + '\n', min: source + '\n' };
		}
		else {
			validateSource(source, `${this.name} from ${this.sourcePath}`);

			const minified = uglify.minify(source, {
				fromString: true,
				compress: { screw_ie8: false },
				mangle: { screw_ie8: false },
				output: { screw_ie8: false, beautify: false }
			});

			return { raw, min: minified.code };
		}
	}

	removeSourceMaps(source) {
		const re = /^\/\/#\ssourceMappingURL(.+)$/gm;

		return { raw: source.raw.replace(re, ''), min: source.min.replace(re, '') };
	}

	writeOutput(root) {
		const dest = path.join(root, this.name);
		const files = [
				['meta.json', JSON.stringify(this.config)],
				['raw.js', this.sources.raw],
				['min.js', this.sources.min]
			];

		return makeDirectory(dest)
			.then(() => Promise.all(files
				.map(([name, contents]) => [path.join(dest, name), contents])
				.map(([path, contents]) => writeFile(path, contents))));
	}
}

const src = path.join(__dirname, '../../polyfills');
const dest = path.join(src, '__dist');

console.log(`Writing compiled polyfill sources to ${dest}/...`);

Promise.resolve()
	.then(() => Promise.all(flattenPolyfillDirectories(src)
		.map(absolute => new Polyfill(absolute, path.relative(src, absolute)))
		.filter(polyfill => polyfill.hasConfigFile)
		.map(polyfill => polyfill.loadConfig()
			.then(() => polyfill.loadSources())
			.then(() => polyfill.updateConfig())
			.then(() => polyfill)
		)
	))
	.then(polyfills => checkForCircularDependencies(polyfills)
		.then(() => checkDependenciesExist(polyfills))
		.then(() => makeDirectory(dest))
		.then(() => console.log('Waiting for files to be written to disk...'))
		.then(() => writeAliasFile(polyfills, dest))
		.then(() => Promise.all(
			polyfills.map(polyfill => polyfill.writeOutput(dest))
		))
	)
	.then(() => console.log('Sources built successfully'))
	.catch(e => {
		console.log(JSON.stringify(e));
		process.exit(1);
	})
;
