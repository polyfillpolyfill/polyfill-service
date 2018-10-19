"use strict";

const isCI = require("is-ci");
const gulp = require("gulp");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const path = require("path");
const rimraf = require("rimraf");
const del = require("del");
const webpack = require("webpack-stream");
const named = require("vinyl-named");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const dotenvSafe = require("dotenv-safe");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const _ = require("lodash");

if (!isCI) {
	const _gulpsrc = gulp.src;
	gulp.src = function() {
		return _gulpsrc.apply(gulp, arguments).pipe(
			plumber({
				errorHandler: function(err) {
					notify.onError({
						title: "Gulp Error",
						message: "Error: <%= error.message %>",
						sound: "Bottle"
					})(err);
					this.emit("end");
				}
			})
		);
	};
}

dotenvSafe.config({
	path: path.join(__dirname, "./.env"),
	example: path.join(__dirname, "./env.example")
});

const moment = require("moment");
const axios = require("axios");

const fastly = async (apiKey, service) => {
	if (!service) {
		throw new Error("No Fastly Service ID has been supplied. This should be set either as an environment variable named FASTLY_SERVICE_ID_PROD or in the file .env at the root of the repository.");
	}

	if (!apiKey) {
		throw new Error("No Fastly API key has been supplied. This should be set either as an environment variable named FASTLY_API_KEY or in the file .env at the root of the repository.");
	}

	const getDailyStatsFor = days => {
		const today = moment().startOf("day");
		const thirtyDaysAgo = moment(today).subtract(days, "days");

		return axios({
			method: "get",
			url: `https://api.fastly.com/stats/service/${service}?from=${thirtyDaysAgo.unix()}&to=${today.unix()}&by=day`,
			headers: {
				"fastly-key": apiKey
			},
			responseType: "json"
		}).then(data => {
			const rollup = {
				requests: 0,
				hits: 0,
				misses: 0,
				bandwidth: 0
			};
			const byday = data.data.data.map(function(data) {
				rollup.requests += data.requests;
				rollup.hits += data.hits;
				rollup.misses += data.miss;
				rollup.bandwidth += data.bandwidth;
				return {
					date: moment(data.start_time, "X").format("DD-MMM-YY"),
					requests: data.requests,
					hits: data.hits,
					misses: data.miss,
					cache: _.round(100 - data.misses / data.requests, 2)
				};
			});
			rollup.cache = _.round(100 - rollup.misses / rollup.requests, 2);
			rollup.startDate = moment(data.data.data[0].start_time, "X").format("MMMM Do");
			rollup.endDate = moment(data.data.data[data.data.data.length - 1].start_time, "X").format("MMMM Do");
			return {
				byday: byday,
				rollup: rollup
			};
		});
	};

	return {
		sevenDays: await getDailyStatsFor(7),
		thirtyDays: await getDailyStatsFor(30)
	};
};

const obtWebpack = require("origami-build-tools/config/webpack.config.prod");
delete obtWebpack.entry;
delete obtWebpack.output;
obtWebpack.devtool = "source-map";

async function generateTemplateData() {
	const templateData = Object.create(null);
	const PolyfillLibrary = require("polyfill-library");
	const UA = require("polyfill-library/lib/UA");
	const polyfillLibrary = new PolyfillLibrary();
	templateData.polyfillAliases = [];
	const aliases = await polyfillLibrary.sourceslib.listAliases();
	for (const alias of Object.keys(aliases).sort()) {
		if (!alias.startsWith("caniuse") && !alias.startsWith("default-") && !alias.startsWith("modernizr")) {
			if (alias === "default") {
				templateData.polyfillAliases.push({
					alias,
					polyfills: aliases[alias],
					isDefaultSet: true
				});
			} else {
				templateData.polyfillAliases.push({
					alias,
					polyfills: aliases[alias]
				});
			}
		}
	}
	const polyfills = [];
	for (const polyfill of await polyfillLibrary.listAllPolyfills()) {
		// Polyfills which start with _ are internal functions used by other polyfills, they should not be displayed on the website.
		if (!polyfill.startsWith("_") && !polyfill.startsWith("Intl.~locale")) {
			polyfills.push(
				Object.assign(
					{
						name: polyfill
					},
					await polyfillLibrary.describePolyfill(polyfill)
				)
			);
		}
	}
	const supportedBrowsers = Object.entries(UA.getBaselines()).map(([browser, version]) => {
		switch (browser) {
			case "ie": {
				browser = "Internet Explorer";
				break;
			}
			case "ie_mob": {
				browser = "Internet Explorer Mobile";
				break;
			}
			case "chrome": {
				browser = "Chrome";
				break;
			}
			case "safari": {
				browser = "Safari";
				break;
			}
			case "ios_saf": {
				browser = "iOS Safari";
				break;
			}
			case "ios_chr": {
				browser = "iOS Chrome";
				break;
			}
			case "firefox": {
				browser = "Firefox";
				break;
			}
			case "firefox_mob": {
				browser = "Firefox Mobile";
				break;
			}
			case "android": {
				browser = "Android";
				break;
			}
			case "opera": {
				browser = "Opera";
				break;
			}
			case "op_mob": {
				browser = "Opera Mobile";
				break;
			}
			case "op_mini": {
				browser = "Opera Mini";
				break;
			}
			case "bb": {
				browser = "BlackBerry";
				break;
			}
			case "samsung_mob": {
				browser = "Samsung Internet";
				break;
			}
		}
		version = version.replace(">=", "");
		return { browser, version };
	});
	return fastly(process.env.FASTLY_API_KEY, process.env.FASTLY_SERVICE_ID_PROD).then(stats => {
		templateData.fastly = stats;
		templateData.polyfills = polyfills;
		templateData.supportedBrowsers = supportedBrowsers;
		return templateData;
	});
}

gulp.task("clean", function() {
	return del(["./website/dist/static/**/*.js", "./website/dist/static/**/*.js.map", "./website/dist/static/**/*.css", "./website/dist/static/**/*.css.map", "./website/dist/static/**/*.html"]);
});

gulp.task("js", function() {
	rimraf.sync("./website/dist/static/**/*.js");
	return gulp
		.src("./website/src/js/**/*.js")
		.pipe(named())
		.pipe(webpack(obtWebpack))
		.pipe(gulp.dest("./website/dist/static"))
		.pipe(browserSync.stream());
});

gulp.task("sass", function() {
	const plugins = [
		autoprefixer({
			browsers: ["> 1%", "last 2 versions", "ie > 6", "ff ESR", "bb >= 7", "safari >= 8"],
			cascade: false,
			flexbox: "no-2009",
			remove: true,
			grid: true
		}),
		cssnano({
			colormin: {
				// Enable IE < 10 compatibility;
				// IE < 10 chokes on the transparent keyword
				// in this mode the conversion from rgba(0,0,0,0) is turned off.
				legacy: true
			},
			// Trims whitespace inside and around rules, selectors & declarations, plus removes the final semicolon inside every selector.
			// Turn this on to improve minified css size.
			core: true,
			// Disable advanced optimisations that are not always safe.
			// This disables custom identifier reduction, z-index rebasing,
			// unused at- rule removal & conversion between absolute length values.
			safe: true,
			// Generate an inline source map.
			sourcemap: false
		})
	];
	rimraf.sync("./website/dist/static/**/*.css");
	return gulp
		.src("./website/src/sass/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				includePaths: [path.join(__dirname, "bower_components")],
				outputStyle: "compressed"
			}).on("error", sass.logError)
		)
		.pipe(postcss(plugins))
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest("./website/dist/static"))
		.pipe(browserSync.stream());
});

let templateData = null;
gulp.task("generate-template-data", async () => {
	if (!templateData) {
		templateData = await generateTemplateData();
	}
});
gulp.task("html", ["generate-template-data"], () => {
	rimraf.sync("./website/dist/**/*.html");
	rimraf.sync("./website/dist/*.html");
	return gulp
		.src("./website/src/pages/*.hbs")
		.pipe(
			handlebars(templateData, {
				ignorePartials: true,
				batch: ["./website/src/partials"],
				helpers: require("handlebars-helpers")()
			})
		)
		.pipe(
			rename({
				extname: ".html"
			})
		)
		.pipe(gulp.dest("./website/dist"));
});

gulp.task("images", () => {
	rimraf.sync("./website/dist/static/images/*");
	return gulp.src("./website/src/images/*").pipe(gulp.dest("./website/dist/static/images/"));
});

gulp.task("build", ["clean", "html", "sass", "js", "images"]);

// Static Server + watching js/scss/html files
gulp.task("default", ["build"], function() {
	browserSync.init({
		server: {
			baseDir: "website/dist",
			serveStaticOptions: {
				extensions: ["html"]
			}
		},
		browser: "google chrome"
	});
	gulp.watch("./website/src/**/*.hbs", ["html"]);
	gulp.watch("./website/src/sass/**/*.scss", ["sass"]);
	gulp.watch("./website/src/js/**/*.js", ["js"]);
	gulp.watch("./website/src/images/*", ["images"]);
	gulp.watch("./website/dist/**/*").on("change", browserSync.reload);
});
