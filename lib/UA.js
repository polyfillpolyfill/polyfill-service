/**
 * Create mappings between the names parsed from useragent (based on
 * https://github.com/tobie/ua-parser/blob/master/regexes.yaml) to caniuse
 * name equivalents.
 *
 * Each caniuse name can match against many names.
 *
 * To add a new mapping add the UA name to the appropriate key.
 */
var useragent = require('useragent');

var agentmappings = {
	"bb": [
		"blackberry webkit",
		"blackberry"
	],
	"firefox": [
		"pale moon (firefox variant)",
		"firefox mobile",
		"firefox namoroka",
		"firefox shiretoko",
		"firefox minefield",
		"firefox alpha",
		"firefox beta",
		"microb",
		"mozilladeveloperpreview"
	],
	"opera": [
		"opera tablet"
	],
	"op_mob": [
		"opera mobile"
	],
	"op_mini": [
		"opera mini"
	],
	"chrome": [
		"chrome mobile",
		"chrome frame",
		"chromium"
	],
	"ie_mob": [
		"ie mobile"
	],
	"ie": [
		"ie large screen",
		"internet explorer"
	],
	"ios_chr": [
		"chrome mobile ios"
	],
	"ios_saf": [
		"mobile safari",
		"iphone"
	]
};

var baseLineVersions = {
	"ie": ">=6",
	"ie_mob": ">=8",
	"chrome": "*",
	"safari": ">=3",
	"ios_saf": ">=3",
	"firefox": ">=3.6",
	"android": ">=2.3",
	"opera": ">=11",
	"op_mob": ">=10",
	"op_mini": ">=5",
	"bb": ">=6"
}

// Invert the mappings above mapping each user agent to the caniuse name for
// faster lookup in agent list
var agentlist = {};
Object.keys(agentmappings).forEach(function(caniuseAgentName) {
	agentmappings[caniuseAgentName].forEach(function(userAgentName) {
		agentlist[userAgentName] = caniuseAgentName;
	});
});

/**
 * jQuery: isNumeric
 * https://github.com/jquery/jquery/blob/bbdfbb4ee859fe9319b348d88120ddc2c9efbd63/src/core.js#L212
 */
function isNumeric(obj) {
	return !Array.isArray(obj) && (((obj- parseFloat(obj)) + 1) >= 0);
}


var UA = function(uaString) {
	var normalized = uaString.match(/^(\w+)\/(\d+)(?:\.(\d+)(?:\.(\d+))?)?$/i);
	if (normalized) {
		this.ua = new useragent.Agent(normalized[1], normalized[2], (normalized[3] || 0), (normalized[4] || 0));
	} else {
		this.ua = useragent.lookup(uaString);
	}

	// Browsers don't really use semantic versioning but tend to at least
	// have a major and minor version.  This normalises the patch version so that
	// semantic version comparison is consistent.
	if (!isNumeric(this.ua.patch)) {
		this.ua.patch = '0';
	}

	// Patch ua.family with the normalised name
	this.ua.family = agentlist[this.ua.family.toLowerCase()] || this.ua.family.toLowerCase();
};

UA.prototype.getFamily = function() {
	return this.ua.family;
};

UA.prototype.getVersion = function() {
	return this.ua.toVersion();
};

UA.prototype.satisfies = function() {
	return (
		this.ua.satisfies.apply(this.ua, arguments) &&
		this.ua.family in baseLineVersions &&
		this.ua.satisfies(baseLineVersions[this.ua.family])
	);
}
UA.prototype.getBaseline = function() {
	return baseLineVersions[this.ua.family];
}
UA.prototype.meetsBaseline = function() {
	return (this.ua.satisfies(baseLineVersions[this.ua.family]));
}

UA.normalize = function(uaString) {
	if (uaString.match(/^\w+\/\d+(\.\d+(\.\d+)?)?$/i)) {
		return uaString.toLowerCase();
	}
	var ua = new UA(uaString);
	return ua ? ua.getFamily() + '/' + ua.getVersion() : undefined;
};

UA.normalizeName = function(uaName) {
	return agentlist[uaName.toLowerCase()] || false;
};

module.exports = UA;
