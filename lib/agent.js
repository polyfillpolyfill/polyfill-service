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
		"ie large screen"
	],
	"ios_chr": [
		"chrome mobile ios"
	],
	"ios_saf": [
		"mobile safari"
	]
};

var agentlist = {};


// Invert the mappings above mapping each user agent to the caniuse name for
// faster lookup in agent list
Object.keys(agentmappings).forEach(function(caniuseAgentName) {
	agentmappings[caniuseAgentName].forEach(function(userAgentName) {
		agentlist[userAgentName] = caniuseAgentName;
	});
});

module.exports = function(uaString) {
	var ua = useragent.lookup(uaString);

	// Browsers don't really use semantic versioning but tend to at least
	// have a major and minor version.  This normalises the patch version so that
	// semantic version comparison is consistent.
	if (!isNumeric(ua.patch)) {
		ua.patch = '0';
	}

	// Patch ua.family with the normalised name
	ua.family = agentlist[ua.family.toLowerCase()] || ua.family.toLowerCase();

	return ua;
}

/**
 * jQuery: isNumeric
 * https://github.com/jquery/jquery/blob/bbdfbb4ee859fe9319b348d88120ddc2c9efbd63/src/core.js#L212
 */
function isNumeric(obj) {
	return !Array.isArray(obj) && (((obj- parseFloat(obj)) + 1) >= 0);
}
