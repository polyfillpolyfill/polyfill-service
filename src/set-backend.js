/// <reference types="@fastly/js-compute" />

// Order in which to try the backends when the client request is near the EU
// const EUBackends = ["F_v3_eu", "ssl_shield_dca_dc_us", "F_v3_us"];
const EUBackends = ["F_v3_eu", "F_v3_us"];

// Order in which to try the backends when the client request is near the US
// const USBackends = ["F_v3_us", "ssl_shield_london_city_uk", "F_v3_eu"];
const USBackends = ["F_v3_us", "F_v3_eu"];

async function fetchAnyResponses(request, backend) {
  return fetch(request.url, {
    backend,
    method: request.method,
    body: request.body,
    headers: request.headers,
    cacheOverride: request.cache,
  });
}

async function fetchOkResponses(request, backend) {
  try {
    let response = await fetchAnyResponses(request, backend);
    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.log(`error ${error} ${error.stack}`);
  }
}

const regionsToRouteToUS = [
  "APAC",
  "Asia",
  "North-America",
  "South-America",
  "US-Central",
  "US-East",
  "US-West",
];
export async function makeBackendRequest(request) {
  // Calculate the ideal region to route the request to.
  let region;
  if (regionsToRouteToUS.includes(fastly.env.get("FASTLY_REGION"))) {
    region = "US";
  } else {
    region = "EU";
  }

  let EUShieldServerName = "LCY";

  let USShieldServerName = "DCA";

  // # Route EU requests to the nearest healthy shield or origin.
  if (region == "EU") {
    // let notOnEUShieldPOP = fastly.env.get("FASTLY_POP") != EUShieldServerName;
    // if (notOnEUShieldPOP) {
    //   let response = await fetchOkResponses(
    //     request,
    //     "ssl_shield_london_city_uk"
    //   );
    //   if (response) {
    //     return response;
    //   }
    // }
    for (const backend of EUBackends) {
      let response = await fetchOkResponses(request, backend);
      if (response) {
        return response;
      }
    }
    return fetchAnyResponses(request, "F_origin_last_ditch_eu");
  }

  // # Route US requests to the nearest healthy shield or origin.
  if (region == "US") {
    // let notOnUSShieldPOP = fastly.env.get("FASTLY_POP") != USShieldServerName;
    // if (notOnUSShieldPOP) {
    //   let response = await fetchOkResponses(request, "ssl_shield_dca_dc_us");
    //   if (response) {
    //     return response;
    //   }
    // }
    for (const backend of USBackends) {
      let response = await fetchOkResponses(request, backend);
      if (response) {
        return response;
      }
    }
    return fetchAnyResponses(request, "F_origin_last_ditch_us");
  }
}
