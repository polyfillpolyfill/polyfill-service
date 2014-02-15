var fs = require('fs');
var join = require('path').join;

exports.agent = {
	js: require('./agent.js.json')
};

exports.useragent = require('./agent.json');

// map lookup for sources with aliases
// source[name] = js string
var source = exports.source = {};
var sourceFolder = join(__dirname, 'source');

fs.readdirSync(sourceFolder).forEach(function (filename) {
	if (filename[0] === '.') return;

	source[filename.replace(/\.js$/, '')] = fs.readFileSync(join(sourceFolder, filename), 'utf8');
});
