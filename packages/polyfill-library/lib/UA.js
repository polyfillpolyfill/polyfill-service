/**
 * Create mappings between the names parsed from useragent to caniuse
 * name equivalents.  We support the caniuse names listed in the
 * `baselineVersion` map below.  This module must return one of these
 * family names, with a version matching the baseline range, for any
 * polyfills to be served.
 *
 * Multiple names may map to the same canonical caniuse family
 */

'use strict';

const useragent = require('useragent');

// Load additional useragent features: primarily to use: agent.satisfies to
// test a browser version against a semver string
require('useragent/features');

// Longest genuine UA seen so far: 255 chars (Facebook in-app on iOS):
const MAX_UA_LEN = 300;

// Use a local LRU cache rather than the one built into useragent, since that cannot be configured
const cache = require('lru-cache')({
	max: 5000
});

const baseLineVersions = {
	"ie": ">=7",
	"ie_mob": ">=8",
	"chrome": "*",
	"safari": ">=4",
	"ios_saf": ">=4",
	"ios_chr": ">=4",
	"firefox": ">=3.6",
	"firefox_mob": ">=4",
	"android": ">=3",
	"opera": ">=11",
	"op_mob": ">=10",
	"op_mini": ">=5",
	"bb": ">=6",
	"samsung_mob": ">=4"
};

/* Aliases may be expressed in three formats:
    1. <detectedfamily>: <targetfamily>
       The browser family is renamed, version is maintained
    2. <detectedfamily>: [<targetfamily>, <targetmajor>, <targetminor>, <targetpatch>]
       The browser family is renamed and the version is set to the one specified
    3. <detectedfamily>: { <semver>: [<targetfamily>, <targetmajor>, <targetminor>, <targetpatch>], ... }
       Specific version ranges of this family are mapped to the specified browsers
	4. <detectedfamily>: <function(uaObj)>
	   The function is called with the parsed UA object, and must return it (but may modify it first)
*/
const aliases = {
	"blackberry webkit": "bb",
	"blackberry": "bb",

	"pale moon (firefox variant)": "firefox",
	"pale moon": "firefox",
	"firefox mobile": "firefox_mob",
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
	"edge": "ie",
	"edge mobile": "ie",
	"uc browser": {
		"9.9.*": ["ie", 10]
	},

	"chrome mobile ios": "ios_chr", // comes back as ios_saf

	"mobile safari": "ios_saf",
	"iphone": "ios_saf", // can't find a uastring which useragent returns iphone as family
	"iphone simulator": "ios_saf", // useragent returns either mobile safari or mobile safari uiwebview
	"mobile safari uiwebview": "ios_saf",
	"mobile safari ui/wkwebview": "ios_saf",

	"samsung internet": "samsung_mob",

	"phantomjs": ["safari", 5],

	"yandex browser": {
		"14.10": ["chrome", 37],
		"14.8": ["chrome", 36],
		"14.7": ["chrome", 35],
		"14.5": ["chrome", 34],
		"14.4": ["chrome", 33],
		"14.2": ["chrome", 32],
		"13.12": ["chrome", 30],
		"13.10": ["chrome", 28],
		"17.9": ["chrome", 60]
	},

	"opera": {
		"20": ["chrome", 33],
		"21": ["chrome", 34],
		"22": ["chrome", 35],
		"23": ["chrome", 36],
		"24": ["chrome", 37],
		"25": ["chrome", 38],
		"26": ["chrome", 39],
		"27": ["chrome", 40],
		"28": ["chrome", 41],
		"29": ["chrome", 42],
		"30": ["chrome", 43],
		"31": ["chrome", 44],
		"32": ["chrome", 45],
		"33": ["chrome", 46],
		"34": ["chrome", 47],
		"35": ["chrome", 48],
		"36": ["chrome", 49],
		"37": ["chrome", 50],
		"38": ["chrome", 51],
		"39": ["chrome", 52],
		"40": ["chrome", 53],
		"41": ["chrome", 54],
		"42": ["chrome", 55],
		"43": ["chrome", 56],
		"44": ["chrome", 57],
		"45": ["chrome", 58],
		"46": ["chrome", 59],
		"47": ["chrome", 60]
	},

	"googlebot": {
		"2.1": ["chrome", 41]
	}
};

function UA(uaString) {

	// Limit the length of the UA to avoid perf issues in UA parsing
	uaString = uaString.substr(0, MAX_UA_LEN);

	// The longest string that can possibly be a normalized browser name that we
	// support is XXXXXXXXXX/###.###.### (22 chars), so avoid doing the regex if
	// the input string is longer than that
	let normalized = (uaString.length < 22) && uaString.match(/^(\w+)\/(\d+)(?:\.(\d+)(?:\.(\d+))?)?$/i);
	if (!normalized) {
		normalized = cache.get(uaString);
	}
	if (normalized) {
		this.ua = new useragent.Agent(normalized[1], normalized[2], (normalized[3] || 0), (normalized[4] || 0));
	} else {

		/* Remove UA tokens that unnecessarily complicate UA parsing */

		// Chrome and Opera on iOS uses a UIWebView of the underlying platform to render
		// content. By stripping the CriOS or OPiOS strings, the useragent parser will alias the
		// user agent to ios_saf for the UIWebView, which is closer to the actual renderer
		uaString = uaString.replace(/((CriOS|OPiOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|(FxiOS\/(\d+)\.(\d+)))/, '');

		// Vivaldi browser is recognised by UA module but is actually identical to Chrome, so
		// the best way to get accurate targeting is to remove the vivaldi token from the UA
		uaString = uaString.replace(/ vivaldi\/[\d\.]+\d+/i, '');

		// Facebook in-app browser `[FBAN/.....]` or `[FB_IAB/.....]` (see #990)
		uaString = uaString.replace(/ \[(FB_IAB|FBAN|FBIOS|FB4A)\/[^\]]+\]/i, '');

		// Electron ` Electron/X.Y.Z` (see #1129)
		uaString = uaString.replace(/ Electron\/[\d\.]+\d+/i, '');

		this.ua = useragent.parse(uaString);

		// For improved CDN cache performance, remove the patch version.  There are few cases in which a patch release drops the requirement for a polyfill, but if so, the polyfill can simply be served unnecessarily to the patch versions that contain the fix, and we can stop targeting at the next minor release.
		this.ua.patch = '0';

		// Resolve aliases
		this.ua.family = this.ua.family.toLowerCase();
		if (aliases[this.ua.family]) {

			// Custom aliasing
			if (typeof aliases[this.ua.family] === 'function') {
				Object.assign(this.ua, aliases[this.ua.family](this.ua));

			// Map to different family, use same version scheme
			} else if (typeof aliases[this.ua.family] === 'string') {
				this.ua.family = aliases[this.ua.family];

			// Map to different family with constant version
			} else if (Array.isArray(aliases[this.ua.family]) && aliases[this.ua.family].length >= 2) {
				const a = aliases[this.ua.family];
				this.ua = new useragent.Agent(a[0], a[1], (a[2] || 0), (a[3] || 0));

			// Map to different family with per-version mapping
			} else if (typeof aliases[this.ua.family] === 'object') {
				for (let semverExpr in aliases[this.ua.family]) { // eslint-disable-line prefer-const
					if (this.ua.satisfies(semverExpr) && Array.isArray(aliases[this.ua.family][semverExpr])) {
						const a = aliases[this.ua.family][semverExpr];
						this.ua = new useragent.Agent(a[0], a[1], (a[2] || 0), (a[3] || 0));
						break;
					}
				}
			}
		}
		cache.set(uaString, ["", this.ua.family, this.ua.major, this.ua.minor, this.ua.patch]);
	}
}

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
};
UA.prototype.getBaseline = function() {
	return baseLineVersions[this.ua.family];
};
UA.prototype.meetsBaseline = function() {
	return (this.ua.satisfies(baseLineVersions[this.ua.family]));
};
UA.prototype.isUnknown = function() {
	return (Object.keys(baseLineVersions).indexOf(this.ua.family) === -1) || !this.meetsBaseline();
};

UA.normalize = function(uaString) {
	if (uaString.match(/^\w+\/\d+(\.\d+(\.\d+)?)?$/i)) {
		return uaString.toLowerCase();
	}
	const ua = new UA(uaString);
	return ua.getFamily() + '/' + ua.getVersion();
};

UA.getBaselines = function() {
	return baseLineVersions;
};


module.exports = UA;
