/**
 * Helper module used to alias browser names parsed out of the 'useragent'
 * module to the equivalent names used in the config.json for each polyfill.
 * Should always be lowercase values as it makes comparisons easier.
 */

var agentlist = {
	"chromium": "chrome",
	"mobile safari": "safari ios",
	"firefox beta": "firefox"
};


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
