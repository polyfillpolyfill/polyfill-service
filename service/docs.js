var fs = require('fs');
var path = require('path');
var request = require('request-promise');
var Handlebars = require('handlebars');
var moment = require('moment');
var sources = require('../lib/sources');
var marked = require('marked');
var zlib = require('zlib');
var PolyfillSet = require('./PolyfillSet');
var polyfillservice = require('../lib');
var compatdata = require('../docs/assets/compat.json');
var extend = require('lodash').extend;

var cache = {};
var cachettls = {fastly:1800, respTimes:1800, outages:86400};

// Pre-cache page templates and partials
var templates = ['index', 'usage', 'compat', 'api', 'examples', 'contributing'].reduce(function(map, temName) {
	map[temName] = Handlebars.compile(
		fs.readFileSync(path.join(__dirname, '/../docs/' + temName + '.html'), {encoding: 'UTF-8'})
	);
	return map;
}, {});
['header', 'footer', 'nav'].forEach(function(partialName) {
	Handlebars.registerPartial(partialName, Handlebars.compile(
		fs.readFileSync(path.join(__dirname, '/../docs/'+partialName+'.html'), {encoding: 'UTF-8'})
	));
});

// Register template helpers
Handlebars.registerHelper("prettifyDate", function(timestamp) {
     return moment(timestamp*1000).format("D MMM YYYY HH:mm");
});
Handlebars.registerHelper("prettifyDuration", function(seconds) {
     return seconds ? moment.duration(seconds*1000).humanize() : 'None';
});
Handlebars.registerHelper('sectionHighlight', function(section, options) {
	return (section === options.hash.name) ? new Handlebars.SafeString(' aria-selected="true"') : '';
});
Handlebars.registerHelper('dispBytes', function(bytes) {
	var i = 0;
	var byteUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	do {
		bytes /= 1024;
		i++;
	} while (bytes > 1024);

	return new Handlebars.SafeString(Math.max(bytes, 0.1).toFixed(1) + byteUnits[i]);
});
Handlebars.registerHelper('lower', function(str) {
	return str.toLowerCase();
});
Handlebars.registerHelper('ifEq', function(v1, v2, options) {
	if (v1 == v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});


function getData(type) {
	var handlers = {
		fastly: function() {
			if (!process.env.FASTLY_SERVICE_ID) return Promise.reject("Fastly environment vars not set");
			return request({
				url: 'https://api.fastly.com/stats/service/' + process.env.FASTLY_SERVICE_ID + '?from=7 days ago&to=2 hours ago&by=hour',
				headers: { 'fastly-key': process.env.FASTLY_API_KEY },
			}).then(function (response) {
				var rollup = {requests:0, hits:0, miss:0, bandwidth:0};
				var data = (response && JSON.parse(response)) || {data:[]};
				var byhour = data.data.map(function(result) {
					rollup.requests += result.requests;
					rollup.hits += result.hits;
					rollup.miss += result.miss;
					rollup.bandwidth += result.bandwidth;
					return {date: result.start_time, requests:result.requests, hits:result.hits, miss:result.miss};
				});
				return {byhour:byhour, rollup:rollup};
			});
		},
		respTimes: function() {
			if (!process.env.PINGDOM_CHECK_ID) return Promise.reject("Pingdom environment vars not set");
			var to = ((new Date()).getTime()/1000) - 3600;
			var from = to - (60*60*24*7);
			return request({
				url: 'https://api.pingdom.com/api/2.0/summary.performance/' + process.env.PINGDOM_CHECK_ID + '?from='+from+'&to='+to+'&resolution=hour',
				headers: {
					'app-key': process.env.PINGDOM_API_KEY,
					'Account-Email': process.env.PINGDOM_ACCOUNT
				},
				auth: {
					user: process.env.PINGDOM_USERNAME,
					pass: process.env.PINGDOM_PASSWORD
				}
			}).then(function (response) {
				var data = (response && JSON.parse(response)) || [];
				if (!data.summary) {
					data = {summary:{hours:[]}};
				}
				return data.summary.hours.map(function(result) {
					return {date: result.starttime, respTime: result.avgresponse};
				});
			});
		},
		outages: function() {
			if (!process.env.PINGDOM_CHECK_ID) return Promise.reject("Pingdom environment vars not set");
			var data = {};
			var periods = {
				"30d": 60*60*24*30,
				"3m": (60*60*24*365) / 4,
				"12m": (60*60*24*365)
			};
			var end = ((new Date()).getTime()/1000) - 3600;  // Ignore the last hour (Pingdom data processing delay)
			return Promise.all(Object.keys(periods).map(function(period) {
				var start = end - periods[period];
				return request({
					url: 'https://api.pingdom.com/api/2.0/summary.average/' + process.env.PINGDOM_CHECK_ID + '?from='+start+'&to='+end+'&includeuptime=true',
					headers: {
						'app-key': process.env.PINGDOM_API_KEY,
						'Account-Email': process.env.PINGDOM_ACCOUNT
					},
					auth: {
						user: process.env.PINGDOM_USERNAME,
						pass: process.env.PINGDOM_PASSWORD
					}
				}).then(function (response) {
					response = JSON.parse(response);
					data[period] = response.summary.status.totaldown;
				});
			})).then(function() {
				return data;
			}).catch(function(e) {
				console.log(e.stack || e);
			});
		},
		sizes: function() {

			// Define a list of all the browsers in which we tested one of the polyfills
			var firstfeature = compatdata[Object.keys(compatdata)[0]];
			var UAs = Object.keys(firstfeature).reduce(function(UAs, family) {
				UAs = UAs.concat(Object.keys(firstfeature[family]).map(function(uaVersion) {
					return {family: family, ver: uaVersion};
				}));
				return UAs;
			}, []);

			// For each of these browsers, get a default bundle and report its size
			return Promise.all(UAs.map(function(browser) {
				var opts = {
					features: PolyfillSet.fromQueryParam('default').get(),
					uaString: browser.family+'/'+browser.ver,
				};
				return Promise.all([
					polyfillservice.getPolyfillString(extend({minify: true}, opts)),
					polyfillservice.getPolyfillString(extend({minify: false}, opts))
				]).then(spread(function (minsrc, rawsrc) {
					var item = {
						family: browser.family,
						ver: browser.ver,
						minsrc: minsrc,
						rawbytes: rawsrc.length,
						minbytes: minsrc.length
					};
					return new Promise(function(resolve, reject) {
						zlib.gzip(item.minsrc, function(err, gzipsrc) {
							if (!err) {
								item.gzipbytes = gzipsrc.length;
							}
							resolve(item);
						});
					});
				}));
			}));
		},
		compat: getCompat
	};

	if (cache.hasOwnProperty(type) && (!('expires' in cache[type]) || cache[type].expires > Date.now())) {
		return cache[type].promise;
	} else {
		cache[type] = {};
		if (cachettls[type]) {
			cache[type].expires = Date.now() + Math.floor((cachettls[type]*1000)*(Math.random()+1));
		}
		console.log('Generating docs data: type='+type+' expires='+cache[type].expires);
		try {
			return cache[type].promise = handlers[type]();
		} catch(err) {
			return cache[type].promise = Promise.reject(err.toString());
		}
	}
}

function getCompat() {
	var sourceslib = sources.getCollection();
	var browsers = ['ie', 'firefox', 'chrome', 'safari', 'opera', 'ios_saf'];
	var msgs = {
		'native': 'Supported natively',
		'polyfilled': 'Supported with polyfill service',
		'missing': 'Not supported'
	};
	return Promise.all(Object.keys(compatdata)
		.filter(function(feature) {
			return sourceslib.polyfillExistsSync(feature) && feature.indexOf('_') !== 0;
		})
		.sort()
		.map(function(feat) {
			return sourceslib.getPolyfill(feat).then(function(polyfill) {
				var fdata = {
					feature: feat,
					slug: feat.replace(/\./g, '_'),
					size: polyfill.minSource.length,
					isDefault: (polyfill.aliases && polyfill.aliases.indexOf('default') !== -1),
					hasTests: polyfill.hasTests,
					docs: polyfill.docs,
					baseDir: polyfill.baseDir,
					spec: polyfill.spec,
					notes: polyfill.notes ? polyfill.notes.map(function (n) { return marked(n); }) : [],
					license: polyfill.license,
					licenseIsUrl: polyfill.license && polyfill.license.length > 5
				};
				browsers.forEach(function(browser) {
					if (compatdata[feat][browser]) {
						fdata[browser] = [];
						Object.keys(compatdata[feat][browser]).sort(function(a, b) {
							if (isNaN(a)) {
								return 1;
							} else if (isNaN(b)) {
								return -1;
							} else {
								return (parseFloat(a) < parseFloat(b)) ? -1 : 1;
							}
						}).forEach(function(version) {
							fdata[browser].push({
								status: compatdata[feat][browser][version],
								statusMsg: msgs[compatdata[feat][browser][version]],
								version: version
							});
						});
					}
				});
				return fdata;
			});
		})
	);
}

// Quick helper for Promise.all to spread results over separate arguments rather than an array
function spread(fn) {
	return function(results) {
		return fn.apply(fn, results);
	};
}

function route(req, res, next) {
	if (req.path.length < "/v2/docs/".length) {
		return res.redirect('/v2/docs/');
	}
	var locals = {
		apiversion: req.params[0]
	};

	if (!req.params || !req.params[1]) {
		res.send(templates.index(extend({section: 'index'}, locals)));

	} else if (req.params[1] === 'usage') {
		// Set the ttl to one hour for the usage page so the graphs are
		// updated more frequently, overriding the default cache-control
		// behaviour set in index.js
		var one_hour = 60 * 60;
		var one_week = one_hour * 24 * 7;
		res.set('Cache-Control', 'public, max-age=' + one_hour +', stale-while-revalidate=' + one_week + ', stale-if-error=' + one_week);
		Promise.all([getData('fastly'), getData('outages'), getData('respTimes')]).then(spread(function(fastly, outages, respTimes) {
			res.send(templates.usage(extend({
				section: 'usage',
				requestsData: fastly.byhour,
				downtime: outages,
				respTimes: respTimes,
				hitCount: fastly.rollup.hits,
				missCount: fastly.rollup.miss
			}, locals)));
		})).catch(function(ex) {
			res.send(templates.usage(extend({
				section: 'usage',
				msg: ex.error || ex.message || ex.toString()
			}, locals)));
		});

	} else if (req.params[1] === 'features') {
		Promise.all([getData('sizes'), getData('compat')]).then(spread(function(sizes, compat) {
			res.send(templates.compat(extend({
				section: 'features',
				compat: compat,
				sizes: sizes
			}, locals)));
		})).catch(function (err) {
			console.log (err.stack || err);
		});

	} else if (req.params[1] === 'api') {
		res.send(templates.api(extend({section: 'api'}, locals)));

	} else if (req.params[1] === 'examples') {

		res.send(templates.examples(extend({section: 'examples'}, locals)));

	} else if (req.params[1] === 'contributing') {
		res.send(templates.contributing(extend({section: 'contributing', baselines: require('../lib/UA').getBaselines()}, locals)));

	} else {
		next();
	}
}

module.exports = {
	route: route
};
