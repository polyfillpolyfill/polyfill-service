/* global ObjectStore */
/// <reference types="@fastly/js-compute" />
import UA from "@financial-times/polyfill-useragent-normaliser/lib/normalise-user-agent-c-at-e.js";
import { normalise_querystring_parameters_for_polyfill_bundle } from "./normalise-query-parameters.js";
import useragent_parser from "@financial-times/useragent_parser/lib/ua_parser-c-at-e.js";
import fetchWithFailover from "./fetch-with-failover.js";
import { cyrb53 } from "./cyrb53.js";
import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()
app.use('*', logger())

app.get("/", (c) => c.redirect("/v3/", 301));
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
app.get("/pages/fixedData", c => c.notFound());
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

app.get(
  "/v3/normalise_querystring_parameters_for_polyfill_bundle",
  function (c) {
    return c.json(
      Object.fromEntries(Array.from(
        normalise_querystring_parameters_for_polyfill_bundle(
          c.req,
          new URL(c.req.url).searchParams
        ).entries())
      )
    );
  }
);

app.get("*", handler);
app.head("*", handler);
app.options("*", handler);
app.all("*", c => {
  return c.text(`${c.req.method} METHOD NOT ALLOWED`, 405);
})
async function handler(c) {
  console.log(`FASTLY_SERVICE_VERSION: ${fastly.env.get('FASTLY_SERVICE_VERSION')}`)
  let requestURL = new URL(c.req.url);
  console.log(requestURL.pathname)
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
  if (/v2\/polyfill(\..*)?\.js/.test(requestURL.pathname)) {
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
    // # The request is to an endpoint which doesn't use query parameters, let's remove them to increase our cache-hit-ratio
    requestURL.search = "";
  }

  const cachedBodies = new ObjectStore('bodies');
  const cachedHeadersAndStatus = new ObjectStore('headersAndStatus');

  const pathAndQuery = requestURL.href.substring(requestURL.origin.length)
  const key = cyrb53(pathAndQuery);
  const cachedBundle = await cachedBodies.get(key);
  let backendResponse;
  if (cachedBundle) {
    const body = await cachedBundle.arrayBuffer()
    const headersAndStatus = await cachedHeadersAndStatus.get(key).then(a => a.json())
    backendResponse = new Response(body, headersAndStatus)
  } else {
    backendResponse = await fetchWithFailover(requestURL, {
      method: c.req.method,
      headers: c.req.headers,
    });
    const body = await backendResponse.arrayBuffer()
    backendResponse = new Response(body, backendResponse)
    await cachedBodies.put(key, body)
    await cachedHeadersAndStatus.put(key, JSON.stringify({
      status: backendResponse.status,
      headers: Object.fromEntries(Array.from(backendResponse.headers.entries()))
    }))
  }

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
    backendResponse = new Response(null, {
      status: 304,
      headers: backendResponse.headers
    });
  }

  if (backendResponse.status == 304 || backendResponse.status == 200) {
    backendResponse.headers.set("age", "0");
  }

  return backendResponse;
}

app.fire()
