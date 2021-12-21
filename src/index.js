/// <reference types="@fastly/js-compute" />
import { Router } from "flight-path";
import { UA } from "./normalise-user-agent-1-9-0";
import { normalise_querystring_parameters_for_polyfill_bundle } from "./normalise-query-parameters";
import { useragent_parser } from "./ua-parser";
import { makeBackendRequest } from "./set-backend";

const allowed_methods = ["GET", "HEAD", "OPTIONS", "FASTLYPURGE", "PURGE"];

const router = new Router();

router.use(async (request, response) => {
  if (!allowed_methods.includes(request.method)) {
    response.status = 405;
    response.send(`${request.method} METHOD NOT ALLOWED`);
  }
});

router.use(async (request, response) => {
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
  if (!isRunningLocally && !request.url.protocol == 'https:') {
    return response.redirect(`https://${host}${request.url.pathname}`);
  }
});

router.use("/", async (_, response) => {
  response.redirect("/v3/");
});

router.use("/v3/normalizeUa", async (request, response) => {
  const useragent = UA.normalize(request.headers["user-agent"]);
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Normalized-User-Agent", useragent);
  response.send(useragent);
});
router.use("/v3/parseUa", async (request, response) => {
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
router.use("/robots.txt", async (_, response) => {
  response.setHeader("content-type", "text/plain; charset=utf-8");
  response.send('"User-agent: *\nDisallow:"');
});

async function notFound(_, response) {
  response.setHeader("content-type", "text/plain; charset=utf-8");
  response.status = 404;
  response.send("Not Found.");
}
router.use("/https://cdn.polyfill.io", notFound);
router.use("/https://polyfill.io", notFound);
router.use("/pages/fixedData", notFound);

router.use("/v1", async (_, response) => {
  return response.redirect("/v3/");
});

router.use("/v1/*", async (request, response) => {
  request.url.searchParams.delete("libVersion");
  request.url.searchParams.delete("gated");
  //   res.body = "API version 1 has been decommissioned. Your request is being redirected to v2.  The `libVersion` and `gated` query string parameters are no longer supported and if present have been removed from your request.\n\nA deprecation period for v1 existed between August and December 2015, during which time v1 requests were honoured but a deprecation warning was added to output.";
  return response.redirect(request.url.pathname.replace("/v1", "/v2"));
});
router.use("/v2/*", async (request, response) => {
  let urlPath = request.url.pathname;
  if (!(urlPath.startsWith("/v2/polyfill.") && urlPath.endsWith("js"))) {
    return response.redirect("/v3/");
  }
});
router.route("OPTIONS", "*", async (_, response) => {
  response.setHeader("allow", "OPTIONS, GET, HEAD");
  response.send("");
});

// # Because the old service had a router which allowed any words between /v2/polyfill. and .js
router.use("/v2/polyfill.*.js", async (request) => {
  request.url.pathname = "/v2/polyfill.min.js";
});

async function configureV2Defaults(request) {
  // # Override the v3 defaults with the defaults of v2
  request.url.pathname.replace("/v2", "/v3");
  request.url.searchParams.set("version", "3.25.1");
  if (!request.url.searchParams.has("unknown")) {
    request.url.searchParams.set("unknown", "ignore");
  }
}

router.use("/v2/polyfill.js", configureV2Defaults);
router.use("/v2/polyfill.min.js", configureV2Defaults);

router.use("/v3/polyfill.js", async function (request) {
  request.url.search = normalise_querystring_parameters_for_polyfill_bundle(
    request,
    request.url.searchParams
  ).toString();
  // # Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
  request.url.searchParams.sort();
});

router.route("*", "*", async function (request, res) {
  const urlPath = request.url.pathname;

  if (urlPath === "/v3/polyfill.min.js" || urlPath === "/v3/polyfill.js") {
    if (request.url.search) {
      request.url.search = normalise_querystring_parameters_for_polyfill_bundle(
        request,
        request.url.searchParams
      ).toString();
      // # Sort the querystring parameters alphabetically to improve chances of hitting a cached copy.
      request.url.searchParams.sort();
    }
  } else {
    // # The request is to an endpoint which doesn't use query parameters, let's remove them to increase our cache-hit-ratio
    request.url.search = "";
  }

  console.log(`indexrequest: ${request}`)
  console.log(`indextypeof request: ${typeof request}`)
  const response = await makeBackendRequest(request);

  res.send(response);
});

router.listen();
