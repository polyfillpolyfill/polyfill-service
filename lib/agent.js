/**
 * Create mappings between the names parsed from useragent (based on
 * https://github.com/tobie/ua-parser/blob/master/regexes.yaml) to caniuse
 * name equivalents.
 *
 * Each caniuse name can match against many names.
 *
 * To add a new mapping add the UA name to the appropriate key.
 */

var agentmappings = {
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
		"chrome mobile ios",
		"chrome mobile",
		"chrome frame",
		"chromium"
	],
	"ie_mob": [
		"ie mobile"
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

/**
 * Return a normalized name for the user agent, if there is no normalized name
 * the name is returned as is, without modification.
 *
 * @param {string} agentname The name of the user agent to normalize.
 * @returns {string} A normalized user agent name.
 */
module.exports = function(agentname) {
	return agentlist[agentname] || agentname;
};
