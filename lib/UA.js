/**
 * Create mappings between the names parsed from useragent to caniuse
 * name equivalents.
 *
 * Multiple names may map to the same canonical caniuse name
 */
var useragent = require('useragent');

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
};

var aliases = {
	"blackberry webkit": "bb",
	"blackberry": "bb",

	"pale moon (firefox variant)": "firefox",
	"firefox mobile": "firefox",
	"firefox namoroka": "firefox",
	"firefox shiretoko": "firefox",
	"firefox minefield": "firefox",
	"firefox alpha": "firefox",
	"firefox beta": "firefox",
	"microb": "firefox",
	"mozilladeveloperpreview": "firefox",
	"iceweasel": "firefox",

	"opera tablet": "opera",

	"opera mobile": "op_mob",
	"opera mini": "op_mini",

	"chrome mobile": "chrome",
	"chrome frame": "chrome",
	"chromium": "chrome",

	"ie mobile": "ie_mob",

	"ie large screen": "ie",
	"internet explorer": "ie",

	"chrome mobile ios": "ios_chr",

	"mobile safari": "ios_saf",
	"iphone": "ios_saf",

	"phantomjs": ["safari", 5, 0, 0]
};


/**
 * jQuery: isNumeric
 * https://github.com/jquery/jquery/blob/bbdfbb4ee859fe9319b348d88120ddc2c9efbd63/src/core.js#L212
 */
function isNumeric(obj) {
	return !Array.isArray(obj) && (((obj- parseFloat(obj)) + 1) >= 0);
}


var UA = function(uaString) {
	var semver, a;

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

	// Resolve aliases
	this.ua.family = this.ua.family.toLowerCase()
	if (aliases[this.ua.family]) {

		// Map to different family, use same version scheme
		if (typeof aliases[this.ua.family] === 'string') {
			this.ua.family = aliases[this.ua.family]

		// Map to different family with constant version
		} else if (Array.isArray(aliases[this.ua.family]) && aliases[this.ua.family].length >= 2) {
			a = aliases[this.ua.family];
			this.ua = new useragent.Agent(a[0], a[1], (a[2] || 0), (a[3] || 0));

		// Map to different family with per-version mapping
		} else if (typeof aliases[this.ua.family] === 'object') {
			for (semver in aliases[this.ua.family]) {
				if (this.ua.satisfies(semver) && Array.isArray(aliases[this.ua.family][semver])) {
					var a = aliases[this.ua.family][semver];
					this.ua = new useragent.Agent(a[0], a[1], (a[2] || 0), (a[3] || 0));
					break;
				}
			}
		}
	}
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

UA.getBaselines = function() {
	return baseLineVersions;
}

UA.normalizeName = function(uaName, version) {
	var semver;
	var name = aliases[uaName.toLowerCase()] || uaName.toLowerCase();
	if (typeof name == 'string') return name;
	if (Array.isArray(name)) return name[0];
	if (typeof name === 'object') {
		for (semver in name) {

			// TODO: return the family of the matching version, not just the first one
			return name[semver][0];
		}
	}
};

module.exports = UA;
