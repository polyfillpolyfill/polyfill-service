var fs = require('fs'),
	path = require('path'),
	request = require('request'),
	Handlebars = require('handlebars'),
	Moment = require('moment');

var cache = {fastly:{}, outages:{}, respTimes:{}},
	cachettl = 1800;

var indexTemplateSrc = fs.readFileSync(path.join(__dirname, '/../docs/index.html'), {encoding: 'UTF-8'}),
	indexTemplate    = Handlebars.compile(indexTemplateSrc);

var usageTemplateSrc = fs.readFileSync(path.join(__dirname, '/../docs/usage.html'), {encoding: 'UTF-8'}),
	usageTemplate    = Handlebars.compile(usageTemplateSrc);

var compatTemplateSrc = fs.readFileSync(path.join(__dirname, '/../docs/compat.html'), {encoding: 'UTF-8'}),
	compatTemplate    = Handlebars.compile(compatTemplateSrc);

var apiTemplateSrc = fs.readFileSync(path.join(__dirname, '/../docs/api.html'), {encoding: 'UTF-8'}),
	apiTemplate    = Handlebars.compile(apiTemplateSrc);

var examplesTemplateSrc = fs.readFileSync(path.join(__dirname, '/../docs/examples.html'), {encoding: 'UTF-8'}),
    examplesTemplate = Handlebars.compile(examplesTemplateSrc);

var contribTemplateSrc = fs.readFileSync(path.join(__dirname, '/../docs/contributing.html'), {encoding: 'UTF-8'}),
    contribTemplate = Handlebars.compile(contribTemplateSrc);

Handlebars.registerHelper("prettifyDate", function(timestamp) {
     return Moment(timestamp*1000).format("D MMM YYYY HH:mm");
});
Handlebars.registerHelper("prettifyDuration", function(seconds) {
     return Moment.duration(seconds*1000).humanize();
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

Handlebars.registerPartial('header', Handlebars.compile(
	fs.readFileSync(path.join(__dirname, '/../docs/header.html'), {encoding: 'UTF-8'})
));
Handlebars.registerPartial('footer', Handlebars.compile(
	fs.readFileSync(path.join(__dirname, '/../docs/footer.html'), {encoding: 'UTF-8'})
));
Handlebars.registerPartial('nav', Handlebars.compile(
	fs.readFileSync(path.join(__dirname, '/../docs/nav.html'), {encoding: 'UTF-8'})
));

function getData(type, cb) {
	var data = [];
	if (cache[type].data && cache[type].timeLoaded > ((new Date()).getTime() - (cachettl*1000)) ) {
		return cb(cache[type].data);
	}
	function saveAndReturn(data) {
		cache[type] = {
			timeLoaded: (new Date()).getTime(),
			data: data
		};
		cb(cache[type].data);
	}
	if (type === 'fastly') {
		request({
			url: 'https://api.fastly.com/stats/service/' + process.env.FASTLY_SERVICE_ID + '?from=7 days ago&to=2 hours ago&by=hour',
			headers: { 'fastly-key': process.env.FASTLY_API_KEY },
		}, function (err, response, body) {
			var byhour = [], rollup = {requests:0, hits:0, miss:0, bandwidth:0};
			try {
				data = JSON.parse(body);
				if (!data.data) data.data = [];
				byhour = data.data.map(function(result) {
					rollup.requests += result.requests;
					rollup.hits += result.hits;
					rollup.miss += result.miss;
					rollup.bandwidth += result.bandwidth;
					return {date: result.start_time, requests:result.requests, hits:result.hits, miss:result.miss};
				});
			} catch (er) { }
			saveAndReturn({byhour:byhour, rollup:rollup});
		});
	} else if (type === 'respTimes') {
		var to = ((new Date()).getTime()/1000) - 3600;
		var from = to - (60*60*24*7);
		request({
			url: 'https://api.pingdom.com/api/2.0/summary.performance/' + process.env.PINGDOM_CHECK_ID + '?from='+from+'&to='+to+'&resolution=hour',
			headers: {
				'app-key': process.env.PINGDOM_API_KEY,
				'Account-Email': process.env.PINGDOM_ACCOUNT
			},
			auth: {
				user: process.env.PINGDOM_USERNAME,
				pass: process.env.PINGDOM_PASSWORD
			}
		}, function (err, response, body) {
			try {
				data = JSON.parse(body);
			} catch (er) {
				data = [];
			}
			if (!data.summary) data = {summary:{hours:[]}};
			saveAndReturn(data.summary.hours.map(function(result) {
				return {date: result.starttime, respTime: result.avgresponse};
			}));
		});
	} else if (type === 'outages') {
		var to = ((new Date()).getTime()/1000) - 3600;
		var from = to - (60*60*24*7);
		request({
			url: 'https://api.pingdom.com/api/2.0/summary.outage/' + process.env.PINGDOM_CHECK_ID + '?from='+from+'&to='+to+'&order=desc',
			headers: {
				'app-key': process.env.PINGDOM_API_KEY,
				'Account-Email': process.env.PINGDOM_ACCOUNT
			},
			auth: {
				user: process.env.PINGDOM_USERNAME,
				pass: process.env.PINGDOM_PASSWORD
			}
		}, function (err, response, body) {
			try {
				data = JSON.parse(body);
			} catch (er) {
				data = [];
			}
			if (!data.summary) data = {summary:{states:[]}};
			saveAndReturn(data.summary.states.filter(function(result) {
				return (result.status !== 'unknown');
			}).map(function(result) {
				return {date:result.timefrom, status: result.status.toUpperCase(), duration: result.timeto-result.timefrom};
			}).slice(0,5));
		});
	}
}

function getCompat() {
	var data = require('../docs/assets/compat.json');
	var sources = require('../lib/sources');
	var browsers = ['ie', 'firefox', 'chrome', 'safari', 'opera', 'ios_saf'];
	var msgs = {
		'native': 'Supported natively',
		'polyfilled': 'Supported with polyfill service',
		'missing': 'Not supported'
	}
	return Object.keys(data)
		.filter(function(feature) {
			return sources.polyfillExists(feature);
		})
		.sort()
		.map(function(feat) {
			var polyfill = sources.getPolyfill(feat);
			var fdata = {
				feature: feat,
				size: Object.keys(polyfill.variants).reduce(function(size, variantName) {
					return Math.max(size, polyfill.variants[variantName].minGatedSource.length);
				}, 0),
				isDefault: (polyfill.aliases.indexOf('default') !== -1),
				hasTests: polyfill.hasTests
			};
			browsers.forEach(function(browser) {
				if (data[feat][browser]) {
					fdata[browser] = [];
					Object.keys(data[feat][browser]).sort(function(a, b) {
						if (isNaN(a)) return 1;
						if (isNaN(b)) return -1;
						return (parseFloat(a) < parseFloat(b)) ? -1 : 1;
					}).forEach(function(version) {
						fdata[browser].push({
							status: data[feat][browser][version],
							statusMsg: msgs[data[feat][browser][version]],
							version: version
						});
					});
				}
			});
			return fdata;
		});
	;
}


function route(req, res, next) {
	var template, templateSrc;
	if (req.path.length < "/v1/docs/".length) return res.redirect('/v1/docs/');

	if (!req.params || !req.params[0]) {
		res.send(indexTemplate({section: 'index'}));
	} else if (req.params[0] === 'usage') {
		// Set the ttl to one hour for the usage page so the graphs are
		// updated more frequently, overriding the default cache-control
		// behaviour set in index.js
		var one_hour = 60 * 60;
		var one_week = one_hour * 24 * 7;
		res.set('Cache-Control', 'public, max-age=' + one_hour +', stale-while-revalidate=' + one_week + ', stale-if-error=' + one_week);
		getData('fastly', function(fastlyData) {
			getData('outages', function(outages) {
				getData('respTimes', function(respTimes) {
					res.send(usageTemplate({
						section: 'usage',
						requestsData: fastlyData.byhour,
						outages: outages,
						respTimes: respTimes,
						hitCount: fastlyData.rollup.hits,
						missCount: fastlyData.rollup.miss
					}));
				});
			});
		});
	} else if (req.params[0] === 'features') {
		res.send(compatTemplate({
			section: 'features',
			compat: getCompat()
		}));
	} else if (req.params[0] === 'api') {
		res.send(apiTemplate({
			section: 'api'
		}));
	} else if (req.params[0] === 'examples') {
		res.send(examplesTemplate({
			section: 'examples'
		}));
	} else if (req.params[0] === 'contributing') {
		res.send(contribTemplate({
			section: 'contributing',
			baselines: require('../lib/UA').getBaselines()
		}));
	} else {
		next();
	}
}

module.exports = {
	route: route
};
