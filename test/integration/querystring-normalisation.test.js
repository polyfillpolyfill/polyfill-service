/* eslint-env mocha */
"use strict";

import assert from "proclaim";
import axios from "./helpers.js";

describe("Querystring normalising", function () {
  describe("Default values", function () {
    it("should set features to 'default'", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.features, "default");
    });
    it("should set excludes to ''", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.excludes, "");
    });
    it("should set rum to '0'", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.rum, "0");
    });
    it("should set unknown to 'polyfill'", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.unknown, "polyfill");
    });
    it("should set flags to ''", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.flags, "");
    });
    it("should set version to ''", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.version, "");
    });
    it("should set callback to ''", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.callback, "");
    });
    it("should set compression to 'br' if Accept-Encoding contains 'br'", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`,
        {
          headers: {
            "Accept-Encoding": "br",
          },
        }
      );
      assert.deepStrictEqual(response.data.compression, "br");
    });
    it("should set compression to 'gzip' if Accept-Encoding contains 'gzip' and User-Agent is not IE6", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`,
        {
          headers: {
            "Accept-Encoding": "gzip",
          },
        }
      );
      assert.deepStrictEqual(response.data.compression, "gzip");
    });
    it("should set compression to '' if Accept-Encoding contains 'gzip' and User-Agent is IE6", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`,
        {
          headers: {
            "Accept-Encoding": "gzip",
            "User-Agent": "MSIE 6",
          },
        }
      );
      assert.deepStrictEqual(response.data.compression, "");
    });
    it("should set compression to '' if Accept-Encoding is not 'br' or 'gzip' ", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`,
        {
          headers: {
            "Accept-Encoding": "identity",
          },
        }
      );
      assert.deepStrictEqual(response.data.compression, "");
    });
    it("should set ua to the normalised user-agent", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`
      );
      assert.deepStrictEqual(response.data.ua, "other/0.0.0");
    });
    it("should set ua to the normalised user-agent", async function () {
      const response = await axios.get(
        `/v3/normalise_querystring_parameters_for_polyfill_bundle`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.220 Safari/537.36",
          },
        }
      );
      assert.deepStrictEqual(response.data.ua, "chrome/65.0.0");
    });
  });

  it("uses features if set", async function () {
    console.log(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc`
    );
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc`
    );
    assert.deepStrictEqual(response.data.features, "a,b,c");
  });
  it("uses excludes if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=a%2Cb,c`
    );
    assert.deepStrictEqual(response.data.excludes, "a,b,c");
  });
  it("uses rum if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?rum=1`
    );
    assert.deepStrictEqual(response.data.rum, "1");
  });
  it("uses unknown if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?unknown=ignore`
    );
    assert.deepStrictEqual(response.data.unknown, "ignore");
  });
  it("uses flags if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?flags=always`
    );
    assert.deepStrictEqual(response.data.flags, "always");
  });
  it("uses version if set to a version in the service (3.25.1)", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.1`
    );
    assert.deepStrictEqual(response.data.version, "3.25.1");
  });
  it("uses version if set to a version in the service (3.27.4)", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.27.4`
    );
    assert.deepStrictEqual(response.data.version, "3.27.4");
  });
  it("uses callback if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=ready`
    );
    assert.deepStrictEqual(response.data.callback, "ready");
  });
  it("uses compression if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?compression=quack`
    );
    assert.deepStrictEqual(response.data.compression, "quack");
  });
  it("uses ua if set", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?ua=carrot/1.2.3`
    );
    assert.deepStrictEqual(response.data.ua, "carrot/1.2.3");
  });

  it("should sort features parameter", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?features=fetch,atob%2CIntersectionObserver`
    );
    assert.deepStrictEqual(
      response.data.features,
      "IntersectionObserver,atob,fetch"
    );
  });

  it("should sort excludes parameter", async function () {
    const response = await axios.get(
      `/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=Map,Array.from%2CSymbol,atob`
    );
    assert.deepStrictEqual(
      response.data.excludes,
      "Array.from,Map,Symbol,atob"
    );
  });
});
