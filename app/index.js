/// <reference types="@fastly/js-compute" />
// import {ObjectStore} from 'fastly:object-store';
import UA from "@financial-times/polyfill-useragent-normaliser/lib/normalise-user-agent-c-at-e.js";
import useragent_parser from "@financial-times/useragent_parser/lib/ua_parser-c-at-e.js";
import {normalise_querystring_parameters_for_polyfill_bundle} from "./normalise-query-parameters.js";
// import { cyrb53 } from "./cyrb53.js";
import {Hono} from 'hono'
import {logger} from './logger.js'
import {get as getFile} from "@jakechampion/c-at-e-file-server";
import {getPolyfillParameters} from "./get-polyfill-parameters.js";

const latestVersion = '3.111.0';
import * as polyfillio from "./polyfill-libraries/polyfill-library/lib/index.js";
console.trace = console.log;
const app = new Hono()
app.onError((error, c) => {
	console.error('Internal App Error:', error, error.stack, error.message);
	return c.text('Internal Server Error', 500)
})

app.get("/", (c) => c.redirect("/v3/", 301));
app.head("/", (c) => c.redirect("/v3/", 301));
app.get("/__health", (c) => {
	c.res.headers.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
	return c.json({
		schemaVersion: 1,
		name: "origami-polyfill-service",
		systemCode: "origami-polyfill-service",
		description: "Open API endpoint for retrieving Javascript polyfill libraries based on the user's user agent",
		checks: [{
			name: "Server is up",
			ok: true,
			severity: 1,
			businessImpact: "Web page rendering may degrade for customers using certain browsers. Dynamic client side behaviour is likely to fail.",
			technicalSummary: "Tests that the service is up.",
			panicGuide: "Look at the application logs.",
			checkOutput: "None",
			lastUpdated: new Date()
		}]
	});
});
app.head("/__health", (c) => {
	c.res.headers.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
	return c.json({
		schemaVersion: 1,
		name: "origami-polyfill-service",
		systemCode: "origami-polyfill-service",
		description: "Open API endpoint for retrieving Javascript polyfill libraries based on the user's user agent",
		checks: [{
			name: "Server is up",
			ok: true,
			severity: 1,
			businessImpact: "Web page rendering may degrade for customers using certain browsers. Dynamic client side behaviour is likely to fail.",
			technicalSummary: "Tests that the service is up.",
			panicGuide: "Look at the application logs.",
			checkOutput: "None",
			lastUpdated: new Date()
		}]
	});
});
app.get("/__gtg", (c) => {
	c.res.headers.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
	return c.text("OK");
});
app.head("/__gtg", (c) => {
	c.res.headers.set("Cache-Control", "max-age=0, must-revalidate, no-cache, no-store, private");
	return c.text("OK");
});
app.use('*', logger())
app.get("/v3/normalizeUa", (c) => {
	const useragent = UA.normalize(c.req.headers.get("User-Agent"));
	c.res.headers.set("Normalized-User-Agent", useragent);
	return c.text(useragent);
});
app.get("/v3/parseUa", (c) => {
	const {
		family,
		major = "0",
		minor = "0",
		patch = "0",
	} = useragent_parser(c.req.headers.get("User-Agent"));
	c.res.headers.set("useragent_parser_family", family);
	c.res.headers.set("useragent_parser_major", major);
	c.res.headers.set("useragent_parser_minor", minor);
	c.res.headers.set("useragent_parser_patch", patch);
	return c.text(`${family}/${major}.${minor}.${patch}`);
});
app.get("/robots.txt", (c) => c.text("User-agent: *\nDisallow:"));
app.get("/https://cdn.polyfill.io", c => c.notFound());
app.get("/https://polyfill.io", c => c.notFound());
app.get("/https://cdn.polyfill.io/", c => c.notFound());
app.get("/https://polyfill.io/", c => c.notFound());
app.get("/pages/fixedData", c => c.notFound());
app.get("/pages/fixedData/", c => c.notFound());
app.get("/v1", (c) => c.redirect("/v3/", 301));
app.get("/v1/*", (c) => {
	const requestURL = new URL(c.req.url);
	requestURL.searchParams.delete("libVersion");
	requestURL.searchParams.delete("gated");
	//   res.body = "API version 1 has been decommissioned. Your request is being redirected to v2.  The `libVersion` and `gated` query string parameters are no longer supported and if present have been removed from your request.\n\nA deprecation period for v1 existed between August and December 2015, during which time v1 requests were honoured but a deprecation warning was added to output.";
	return c.redirect(
		requestURL.pathname.replace("/v1", "/v2") + requestURL.search, 301
	);
});

app.options("*", (c) => {
	c.res.headers.set("allow", "OPTIONS, GET, HEAD");
	return c.text("");
});

function configureV2Defaults(url) {
	url.pathname = url.pathname.replace("/v2", "/v3");
	url.searchParams.set("version", "3.25.1");
	if (!url.searchParams.has("unknown")) {
		url.searchParams.set("unknown", "ignore");
	}
	return url;
}

const lastModified = new Date().toUTCString();

function respondWithBundle(c, bundle) {
	c.status(200);
	c.header("Access-Control-Allow-Origin", "*");
	c.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
	c.header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800");
	c.header("Content-Type", "text/javascript; charset=UTF-8");
	c.header("surrogate-key", "polyfill-service");
	c.header("Last-Modified", lastModified);
	c.header("x-compress-hint", "on");

	return c.body(bundle);
}

async function polyfill(requestURL, c) {
	const parameters = getPolyfillParameters(requestURL);
	
	// Map the version parameter to a version of the polyfill library.
	const versionToLibraryMap = new Map([
		[latestVersion, 'polyfill-library'],
		['3.25.1', 'polyfill-library-3.25.1'],
		['3.27.4', 'polyfill-library-3.27.4'],
		['3.34.0', 'polyfill-library-3.34.0'],
		['3.39.0', 'polyfill-library-3.39.0'],
		['3.40.0', 'polyfill-library-3.40.0'],
		['3.41.0', 'polyfill-library-3.41.0'],
		['3.42.0', 'polyfill-library-3.42.0'],
		['3.46.0', 'polyfill-library-3.46.0'],
		['3.48.0', 'polyfill-library-3.48.0'],
		['3.50.2', 'polyfill-library-3.50.2'],
		['3.51.0', 'polyfill-library-3.51.0'],
		['3.52.0', 'polyfill-library-3.52.0'],
		['3.52.1', 'polyfill-library-3.52.1'],
		['3.52.2', 'polyfill-library-3.52.2'],
		['3.52.3', 'polyfill-library-3.52.3'],
		['3.53.1', 'polyfill-library-3.53.1'],
		['3.89.4', 'polyfill-library-3.89.4'],
		['3.96.0', 'polyfill-library-3.96.0'],
		['3.98.0', 'polyfill-library-3.98.0'],
		['3.101.0', 'polyfill-library-3.101.0'],
		['3.103.0', 'polyfill-library-3.103.0'],
		['3.104.0', 'polyfill-library-3.104.0'],
		['3.108.0', 'polyfill-library-3.108.0'],
		['3.109.0', 'polyfill-library-3.109.0'],
		['3.110.1', 'polyfill-library-3.110.1'],
		['3.111.0', 'polyfill-library-3.111.0'],
	]);
	
	const library = versionToLibraryMap.get(parameters.version);
	// 404 if no library for the requested version was found.
	if (!library) {
		c.status(400);
		c.header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800");
		return c.text(`requested version does not exist`);
	}
	
	// 400 if requested polyfills are missing
	// if (polyfillLibrary && parameters.strict) {
	// 	const features = new Set([
	// 		...Object.values(await polyfillLibrary.listAliases()).flat(), 
	// 		...Object.values(await polyfillLibrary.listAllPolyfills()).flat()
	// 	]);
	// 	const requestedFeaturesAllExist = Object.keys(parameters.features).every(feature => features.has(feature));
	// 	if (!requestedFeaturesAllExist) {
	// 		const requestedFeaturesWhichDoNotExist = Object.keys(parameters.features).filter(feature => !features.has(feature));
	// 		c.status(400);
	// 		c.header("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800");
	// 		return c.text(`Requested features do not all exist in polyfill-service, please remove them from the URL: ${requestedFeaturesWhichDoNotExist.join(",")} do not exist.`);
	// 	}
	// }

	// const cache = new ObjectStore('cache');

	// const key = cyrb53(String(requestURL))
	// let bundle = await cache.get(key);
	// if (bundle) {
	// 	return new Response(bundle.body, {
	// 		headers: {
	// 			"Access-Control-Allow-Origin": "*",
	// 			"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
	// 			"Cache-Control": "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800",
	// 			"Content-Type": "text/javascript; charset=UTF-8",
	// 			"surrogate-key": "polyfill-service",
	// 			"Last-Modified": lastModified,
	// 			"x-compress-hint": "on",
	// 		}
	// 	})
	// } else {
		let bundle = await polyfillio.getPolyfillString(parameters, library, parameters.version);

		// c.executionCtx.waitUntil(cache.put(key, bundle));
	// }
	return respondWithBundle(c, bundle);
}

app.get("*", handler);
app.head("*", handler);
app.options("*", handler);
app.all("*", c => {
	return c.text(`${c.req.method} METHOD NOT ALLOWED`, 405);
})

app.notFound((c) => {
	c.res.headers.set("Cache-Control", "max-age=604800, public, stale-while-revalidate=604800, stale-if-error=604800");
	return c.text('Not Found', 404)
})


async function handler(c) {
	let requestURL = new URL(c.req.url);
	const host = c.req.headers.get('host');
	// Canonicalize requests onto https://polyfill.io (and allow https://polyfills.io)
	switch (host) {
		//  We are no longer redirecting this domain and instead using it as an
		// alternative domain for when polyfill.io is blocked:
		// https://github.com/Financial-Times/polyfill-service/issues/2638
		// case "polyfills.io":
		case "www.polyfills.io":
		case "www.polyfill.io": {
			// Do the canonicalise redirects before the HTTPS redirect to avoid a double redirect
			return c.redirect(`https://polyfill.io${requestURL.pathname}`, 301);
		}
	}
	const fastlyHostname = fastly.env.get("FASTLY_HOSTNAME");
	const isRunningLocally = fastlyHostname === "localhost";
	// Fastly C@E Local Testing has a limitation where TLS information about the client connection is not available
	// https://developer.fastly.com/learning/compute/testing/#constraints-and-limitations-1
	// if (!isRunningLocally && !c.req.headers.get('fastly-ssl')) {
	if (!isRunningLocally && requestURL.protocol != "https:") {
		return c.redirect(`https://${host}${requestURL.pathname}`, 301);
	}

	// # Because the old service had a router which allowed any words between /v2/polyfill. and .js
	if (requestURL.pathname == '/v2/polyfill.js') {
		requestURL.pathname = "/v2/polyfill.js";
		requestURL = configureV2Defaults(requestURL);
	} else if (/v2\/polyfill(\..*)?\.js/.test(requestURL.pathname)) {
		requestURL.pathname = "/v2/polyfill.min.js";
		requestURL = configureV2Defaults(requestURL);
	}

	if (
		requestURL.pathname.startsWith("/v2/") ||
		requestURL.pathname == "/v2"
	) {
		let urlPath = requestURL.pathname;
		if (!(urlPath.startsWith("/v2/polyfill.") && urlPath.endsWith("js"))) {
			return c.redirect("/v3/", 301);
		}
	}

	const urlPath = requestURL.pathname;

	if (urlPath === "/v3/polyfill.min.js" || urlPath === "/v3/polyfill.js") {
		requestURL.search = normalise_querystring_parameters_for_polyfill_bundle(
			c.req,
			requestURL.searchParams
		).toString();
		// # Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
		requestURL.searchParams.sort();
	} else {
		// Maybe make this a fixed list of paths we know exist?
		// If the provided key:
		// Is any of the strings "", ".", or ".."
		// Starts with the string ".well-known/acme-challenge/"
		// Contains any of the characters "#?*[]\n\r"
		// Is longer than 1024 characters
		if (urlPath.length > 0 && 
			urlPath.length <= 1024 && 
			urlPath != '.' && 
			urlPath != '..' && 
			urlPath.startsWith(".well-known/acme-challenge/") === false &&
			/[#*?[]\n\r]/.test(urlPath) === false
			) {
			try {
				const response = await getFile('site', c.req)
				if (response) {
					// Enable Dynamic Compression -- https://developer.fastly.com/learning/concepts/compression/#dynamic-compression
					response.headers.set("x-compress-hint", "on");
					response.headers.set("Cache-Control", "public, s-maxage=31536000, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800");
					return response;
				}
			} catch { /* empty */ }
		} else {
			console.log('naughty')
		}
		c.res.headers.set("Cache-Control", "max-age=604800, public, stale-while-revalidate=604800, stale-if-error=604800");
		return c.text('Not Found', 404)
	}

	let backendResponse = await polyfill(requestURL, c);


	backendResponse.headers.set('useragent_normaliser', requestURL.searchParams.get('ua'));

	if (urlPath === "/v3/polyfill.min.js" || urlPath === "/v3/polyfill.js") {
		let vary = backendResponse.headers.get("vary");
		if (vary) {
			if (!/\bUser-Agent\b/.test(vary)) {
				backendResponse.headers.set("vary", `${vary}, User-Agent`);
			}
		} else {
			backendResponse.headers.set("vary", "User-Agent");
		}
	}

	let vary = backendResponse.headers.get("vary");
	if (vary) {
		if (!/\bAccept-Encoding\b/.test(vary)) {
			backendResponse.headers.set("vary", `${vary}, Accept-Encoding`);
		}
	} else {
		backendResponse.headers.set("vary", "Accept-Encoding");
	}

	if (c.req.headers.has("if-modified-since") && backendResponse.headers.get("last-modified") && new Date(c.req.headers.get("if-modified-since")) >= new Date(backendResponse.headers.get("last-modified"))) {
		backendResponse.headers.set("age", "0")
		backendResponse = new Response(undefined, {
			status: 304,
			headers: backendResponse.headers
		});
	}

	if (backendResponse.status == 304 || backendResponse.status == 200) {
		backendResponse.headers.set("Age", "0");
	}

	return backendResponse;
}

app.fire()
