/// <reference types="@fastly/js-compute" />
import { Router } from "flight-path";
import UA from "@financial-times/polyfill-useragent-normaliser/lib/normalise-user-agent-c-at-e.js";
import { normalise_querystring_parameters_for_polyfill_bundle } from "./normalise-query-parameters.js";
import useragent_parser from "@financial-times/useragent_parser/lib/ua_parser-c-at-e.js";

const allowed_methods = new Set(["GET", "HEAD", "OPTIONS", "FASTLYPURGE", "PURGE"]);

const router = new Router();

router.use(async function(request, response) {
  response.setHeader("Server-Timing", fastly.env.get("FASTLY_HOSTNAME"));
})
router.get("/", async (_, response) => {
  response.redirect("/v3/");
});

router.get("/v3/normalizeUa", async (request, response) => {
  const useragent = UA.normalize(request.headers["user-agent"]);
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Normalized-User-Agent", useragent);
  response.send(useragent);
});

router.get("/v3/parseUa", async (request, response) => {
  const {
    family,
    major = "0",
    minor = "0",
    patch = "0",
  } = useragent_parser(request.headers["user-agent"]);
  response.setHeader("content-type", "text/plain; charset=utf-8");
  response.setHeader("useragent_parser_family", family);
  response.setHeader("useragent_parser_major", major);
  response.setHeader("useragent_parser_minor", minor);
  response.setHeader("useragent_parser_patch", patch);
  response.send(`${family}/${major}.${minor}.${patch}`);
});
router.get("/robots.txt", async (_, response) => {
  response.setHeader("content-type", "text/plain; charset=utf-8");
  response.send("User-agent: *\nDisallow:");
});

async function notFound(_, response) {
  response.setHeader("content-type", "text/plain; charset=utf-8");
  response.status = 404;
  response.send("Not Found.");
}
router.get("/https://cdn.polyfill.io", notFound);
router.get("/https://polyfill.io", notFound);
router.get("/pages/fixedData", notFound);

router.get("/v1", async (_, response) => {
  return response.redirect("/v3/");
});

router.get("/v1/*", async (request, response) => {
  request.url.searchParams.delete("libVersion");
  request.url.searchParams.delete("gated");
  //   res.body = "API version 1 has been decommissioned. Your request is being redirected to v2.  The `libVersion` and `gated` query string parameters are no longer supported and if present have been removed from your request.\n\nA deprecation period for v1 existed between August and December 2015, during which time v1 requests were honoured but a deprecation warning was added to output.";
  return response.redirect(
    request.url.pathname.replace("/v1", "/v2") + request.url.search
  );
});

router.route("OPTIONS", "*", async (_, response) => {
  response.setHeader("allow", "OPTIONS, GET, HEAD");
  response.send("");
});

function configureV2Defaults(request) {
  // # Override the v3 defaults with the defaults of v2
  request.url.pathname = request.url.pathname.replace("/v2", "/v3");
  request.url.searchParams.set("version", "3.25.1");
  if (!request.url.searchParams.has("unknown")) {
    request.url.searchParams.set("unknown", "ignore");
  }
}

router.get(
  "/v3/normalise_querystring_parameters_for_polyfill_bundle",
  async function (request, response) {
    response.json(
      Object.fromEntries(Array.from(
        normalise_querystring_parameters_for_polyfill_bundle(
          request,
          request.url.searchParams
        ).entries())
      )
    );
  }
);

router.route("*", "*", async function (request, response) {
	console.log(request.url)
  if (!allowed_methods.has(request.method)) {
    response.status = 405;
    return response.send(`${request.method} METHOD NOT ALLOWED`);
  }

  if (request.method === "PURGE") {
		request.headers['Fastly-Purge-Requires-Auth'] = "1";
    let backendResponse = await fetch(request.url.toString(), {
      backend: "polyfill",
      headers: request.headers,
      method: request.method
    });
    return response.send(backendResponse);
  }

  const host = request.headers.host;
  // Canonicalize requests onto https://polyfill.io (and allow https://polyfills.io)
  switch (host) {
    //  We are no longer redirecting this domain and instead using it as an
    // alternative domain for when polyfill.io is blocked:
    // https://github.com/Financial-Times/polyfill-service/issues/2638
    // case "polyfills.io":
    case "www.polyfills.io":
    case "www.polyfill.io": {
      // Do the canonicalise redirects before the HTTPS redirect to avoid a double redirect
      return response.redirect(`https://polyfill.io${request.url.pathname}`);
    }
  }
  const fastlyHostname = fastly.env.get("FASTLY_HOSTNAME");
  const isRunningLocally = fastlyHostname === "localhost";
  // Fastly C@E Local Testing has a limitation where TLS information about the client connection is not available
  // https://developer.fastly.com/learning/compute/testing/#constraints-and-limitations-1
  // if (!isRunningLocally && !request.headers['fastly-ssl']) {
  if (!isRunningLocally && request.url.protocol != "https:") {
    return response.redirect(`https://${host}${request.url.pathname}`);
  }

  // # Because the old service had a router which allowed any words between /v2/polyfill. and .js
  if (/v2\/polyfill(\..*)?\.js/.test(request.url.pathname)) {
    request.url.pathname = "/v2/polyfill.min.js";
    configureV2Defaults(request);
  }

  if (
    request.url.pathname.startsWith("/v2/") ||
    request.url.pathname == "/v2"
  ) {
    let urlPath = request.url.pathname;
    if (!(urlPath.startsWith("/v2/polyfill.") && urlPath.endsWith("js"))) {
      return response.redirect("/v3/");
    }
  }

  const urlPath = request.url.pathname;

  if (urlPath === "/v3/polyfill.min.js" || urlPath === "/v3/polyfill.js") {
		request.url.search = normalise_querystring_parameters_for_polyfill_bundle(
			request,
			request.url.searchParams
		).toString();
		// # Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
		request.url.searchParams.sort();
  } else {
    // # The request is to an endpoint which doesn't use query parameters, let's remove them to increase our cache-hit-ratio
    request.url.search = "";
  }

  let backendResponse = await fetch(request.url.toString(), {
    backend: "polyfill",
    headers: request.headers,
    method: request.method
  });

	backendResponse.headers.set('useragent_normaliser', request.url.searchParams.get('ua'));

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

  if (new Date(request.headers["if-modified-since"]) >= new Date(backendResponse.headers.get("last-modified"))) {
    backendResponse.headers.set("age", "0")
    backendResponse = new Response(null, {
      status: 304,
      headers: backendResponse.headers
    });
  }

  if (backendResponse.status == 304 || backendResponse.status == 200) {
    backendResponse.headers.set("Age", "0");
  }

  response.send(backendResponse);
});

router.listen();
