var fs = require('fs'),
	path = require('path');

var polyfillSourceFolder = path.join(__dirname, 'source');

module.exports = (function initialisePolyfillInfo() {
	var sources = {},
		aliases = {};

	fs.readdirSync(polyfillSourceFolder).forEach(function (polyfillName) {

		var config = require(path.join(polyfillSourceFolder, polyfillName, 'config.json')),
			polyfillSourcePath = path.join(polyfillSourceFolder, polyfillName, 'polyfill.js');

		// Read each file and store in a map for quick lookup
		sources[polyfillName] = {
			file: fs.readFileSync(polyfillSourcePath, 'utf8'),
			config: config
		};

		// Store alias names in a map for efficient lookup, mapping aliases to
		// polyfillNames.  An alias can map to many polyfill names. So a group
		// of polyfills can be aliased under the same name.  This is why an
		// array is created and used for the value in the map.
		config.aliases = config.aliases || [];
		config.aliases.forEach(function(aliasName) {
			if (aliases[aliasName]) {
				aliases[aliasName].push(polyfillName);
			} else {
				aliases[aliasName] = [ polyfillName ];
			}
		});
	});

	return { sources: sources, aliases: aliases };
}());
