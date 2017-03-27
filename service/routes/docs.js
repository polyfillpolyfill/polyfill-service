'use strict';

const fs = require('graceful-fs');
const path = require('path');
const request = require('request-promise');
const Handlebars = require('handlebars');
const moment = require('moment');
const sources = require('../../lib/sources');
const marked = require('marked');
const zlib = require('zlib');
const PolyfillSet = require('../PolyfillSet');
const polyfillservice = require('../../lib');
const compatdata = require('../../docs/assets/compat.json');
const appVersion = require(path.join(__dirname,'../../package.json')).version;
const RumReport = require('../RumReport.js').Perf;

const docsData = {errors:[]};
const templCache = {};


// Template loader
function template(name) {
	if (name in templCache) return templCache[name];
	return templCache[name] = new Promise((resolve, reject) => {
		const filepath = path.join(__dirname, '/../../docs/' + name + '.html');
		fs.readFile(filepath, 'utf-8', (err, content) => {
			if (!err) resolve(Handlebars.compile(content));
			else reject(err);
		});
	});
}
['header', 'footer', 'nav'].forEach(partialName => {
	Handlebars.registerPartial(partialName, Handlebars.compile(
		fs.readFileSync(path.join(__dirname, '/../../docs/'+partialName+'.html'), {encoding: 'UTF-8'})
	));
});

// Register template helpers
Handlebars.registerHelper({
	prettifyDate: timestamp => moment(timestamp*1000).format("D MMM YYYY HH:mm"),
	prettifyDuration: seconds => seconds ? moment.duration(seconds*1000).humanize() : 'None',
	lower: str => str.toLowerCase(),
	number_format: str => parseInt(str, 10).toLocaleString(),
	percent: (n, total) => (Math.round((n/total)*10000)/100),
	ifEq: (v1, v2, options) => (v1 === v2) ? options.fn(this) : options.inverse(this),
	ifPrefix: (v1, v2, options) => (v1.indexOf(v2) === 0) ? options.fn(this) : options.inverse(this),
	sectionHighlight: (section, pageName) => {
		return (section === pageName) ? new Handlebars.SafeString(' aria-selected="true"') : '';
	},
	dispBytes: bytes => {
		const byteUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		let i = 0;
		do {
			bytes /= 1024;
			i++;
		} while (bytes > 1024);

		return new Handlebars.SafeString(Math.max(bytes, 0.1).toFixed(1) + byteUnits[i]);
	}
});


function refreshData() {
	const cachettls = {fastly:1800, respTimes:1800, outages:86400, rumPerf:86400};
	const handlers = {
		fastly: () => {
			if (!process.env.FASTLY_SERVICE_ID) throw new Error("Fastly access disabled.  See README for environment variables required for Fastly access.");
			const endTime = moment().startOf('day');
			const startTime = moment(endTime).subtract(180, 'days');
			return request({
				url: 'https://api.fastly.com/stats/service/' + process.env.FASTLY_SERVICE_ID + '?from='+startTime.unix()+'&to='+endTime.unix()+'&by=day',
				headers: { 'fastly-key': process.env.FASTLY_API_KEY },
				json: true
			}).then(data => {
				const rollup = {requests:0, hits:0, miss:0, bandwidth:0};
				const byday = data.data.map(function(result) {
					rollup.requests += result.requests;
					rollup.hits += result.hits;
					rollup.miss += result.miss;
					rollup.bandwidth += result.bandwidth;
					return {date: result.start_time, requests:result.requests, hits:result.hits, miss:result.miss};
				});
				return {byday:byday, rollup:rollup};
			});
		},
		respTimes: () => {
			if (!process.env.PINGDOM_CHECK_ID) throw new Error("Pingdom access disabled.  See README for environment variables required for Pingdom access");
			const to = ((new Date()).getTime()/1000) - 3600;
			const from = to - (60*60*24*7);
			return request({
				url: 'https://api.pingdom.com/api/2.0/summary.performance/' + process.env.PINGDOM_CHECK_ID + '?from='+from+'&to='+to+'&resolution=hour',
				headers: {
					'app-key': process.env.PINGDOM_API_KEY,
					'Account-Email': process.env.PINGDOM_ACCOUNT
				},
				auth: {
					user: process.env.PINGDOM_USERNAME,
					pass: process.env.PINGDOM_PASSWORD
				},
				json: true
			}).then(data => {
				if (!data.summary) {
					data = {summary:{hours:[]}};
				}
				return data.summary.hours.map(result => ({date: result.starttime, respTime: result.avgresponse}));
			});
		},
		outages: () => {
			if (!process.env.PINGDOM_CHECK_ID) throw new Error("Pingdom access disabled.  See README for environment variables required for Pingdom access");
			const data = {};
			const periods = {
				"30d": 60*60*24*30,
				"3m": (60*60*24*365) / 4,
				"12m": (60*60*24*365)
			};
			const end = ((new Date()).getTime()/1000) - 3600;  // Ignore the last hour (Pingdom data processing delay)
			return Promise.all(Object.keys(periods).map(period => {
				const start = end - periods[period];
				return request({
					url: 'https://api.pingdom.com/api/2.0/summary.average/' + process.env.PINGDOM_CHECK_ID + '?from='+start+'&to='+end+'&includeuptime=true',
					headers: {
						'app-key': process.env.PINGDOM_API_KEY,
						'Account-Email': process.env.PINGDOM_ACCOUNT
					},
					auth: {
						user: process.env.PINGDOM_USERNAME,
						pass: process.env.PINGDOM_PASSWORD
					},
					json: true
				}).then(response => {
					data[period] = response.summary.status.totaldown;
				});
			})).then(() => data);
		},
		sizes: () => {

			// Define a list of all the browsers in which we tested one of the polyfills
			const firstfeature = compatdata[Object.keys(compatdata)[0]];
			const UAs = Object.keys(firstfeature).reduce((UAs, family) => {
				return UAs.concat(Object.keys(firstfeature[family]).map(uaVersion => ({family, ver: uaVersion})));
			}, []);

			// For each of these browsers, get a default bundle and report its size
			return Promise.all(UAs.map(browser => {
				const opts = {
					features: PolyfillSet.fromQueryParam('default').get(),
					uaString: browser.family+'/'+browser.ver,
				};
				return Promise.all([
					polyfillservice.getPolyfillString(Object.assign({minify: true}, opts)),
					polyfillservice.getPolyfillString(Object.assign({minify: false}, opts))
				]).then(spread((minsrc, rawsrc) => {
					const item = {
						family: browser.family,
						ver: browser.ver,
						minsrc: minsrc,
						rawbytes: rawsrc.length,
						minbytes: minsrc.length
					};
					return new Promise(resolve => {
						zlib.gzip(item.minsrc, (err, gzipsrc) => {
							if (!err) {
								item.gzipbytes = gzipsrc.length;
							}
							resolve(item);
						});
					});
				}));
			}));
		},
		rumPerf: () => {
			return (new RumReport({period:30, minSample:10000, dimensions:['data_center'], stats:['median', '95P', 'count']})).getStats()
				.then(data => ({
					rows: data,
					scaleMax: data.reduce((max, row) => Math.max(max, row.perf_dns_95P+row.perf_connect_95P+row.perf_req_95P+row.perf_resp_95P), 0)+1, // +1 because biggest bar must be <100% width to avoid wrapping
					period: 30,
					minSample: 10000
				}))
			;
		},
		compat: () => {
			const browsers = ['ie', 'firefox', 'chrome', 'safari', 'opera', 'ios_saf'];
			const msgs = {
				'native': 'Supported natively',
				'polyfilled': 'Supported with polyfill service',
				'missing': 'Not supported'
			};
			return Promise.all(Object.keys(compatdata)
				.filter(feature => sources.polyfillExistsSync(feature) && feature.indexOf('_') !== 0)
				.sort()
				.map(feat => {
					return sources.getPolyfill(feat).then(polyfill => {
						const fdata = {
							feature: feat,
							slug: feat.replace(/[^\w]/g, '_'),
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
						browsers.forEach(browser => {
							if (compatdata[feat][browser]) {
								fdata[browser] = [];
								Object.keys(compatdata[feat][browser])
									.sort((a, b) => isNaN(a) ? 1 : (isNaN(b) || parseFloat(a) < parseFloat(b)) ? -1 : 1)
									.forEach(version => {
										fdata[browser].push({
											status: compatdata[feat][browser][version],
											statusMsg: msgs[compatdata[feat][browser][version]],
											version: version
										});
									});
								;
							}
						});
						return fdata;
					});
				})
			);
		}
	};

	Object.keys(handlers).forEach(type => {
		if (!docsData.hasOwnProperty(type) || (docsData[type] !== null && 'expires' in docsData[type] && docsData[type].expires < Date.now())) {
			console.log('Generating docs data: type='+type);
			try {
				handlers[type]()
					.then(result => {
						docsData[type] = result;
						if (result !== null) {
							if (cachettls[type]) {
								docsData[type].expires = Date.now() + Math.floor((cachettls[type]*1000)*(Math.random()+1));
							}
						}
					})
					.catch(err => {
						docsData.errors.push("["+type+" (in promise)] "+ (err.msg || err.message || err.toString()));
					})
				;
			} catch (err) {
				docsData.errors.push("["+type+"] "+ (err.msg || err.message || err.toString()));
			}
		}
	});
}

// Quick helper for Promise.all to spread results over separate arguments rather than an array
// Can remove once Node supports destructuring parameters
function spread(fn) {
	return function(results) {
		return fn.apply(fn, results);
	};
}

function route(req, res, next) {
	if (req.path.length < "/v2/docs/".length) {
		return res.redirect('/v2/docs/');
	}
	const locals = Object.assign({
		apiversion: req.params[0],
		appversion: appVersion,
		pageName: (req.params[1] || 'index').replace(/\/$/, ''),
		rumEnabled: !!process.env.RUM_MYSQL_DSN
	}, docsData);

	if (locals.pageName === 'usage') {

		// Set the ttl to one hour for the usage page so the graphs are
		// updated more frequently, overriding the default cache-control
		// behaviour set in index.js
		const one_hour = 60 * 60;
		const one_week = one_hour * 24 * 7;
		res.set('Cache-Control', 'public, max-age=' + one_hour + ', stale-while-revalidate=' + one_week + ', stale-if-error=' + one_week);
	} else if (locals.pageName === 'contributing/authoring-polyfills') {
		locals.baselines = require('../../lib/UA').getBaselines();
	}

	template(locals.pageName)
		.then(templFn => res.send(templFn(locals)))
		.catch(err => {
			console.log(err);
			next();
		})
	;
}

module.exports = route;

setInterval(refreshData, 300000);
refreshData();
