/* eslint-env mocha */
"use strict";

const assert = require("proclaim");
const axios = require("./helpers.js");

describe("Querystring normalising", function () {
  context('compute-at-edge service', function () {
    describe("Default values", function () {
      it("should set features to 'default'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.features), "default");
      });
      it("should set excludes to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.excludes), "");
      });
      it("should set rum to '0'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.rum), "0");
      });
      it("should set unknown to 'polyfill'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.unknown), "polyfill");
      });
      it("should set flags to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.flags), "");
      });
      it("should set version to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.version), "");
      });
      it("should set callback to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.callback), "");
      });
      it("should set compression to 'br' if Accept-Encoding contains 'br'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes",
          {
            headers: {
              "Accept-Encoding": "br",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "br");
      });
      it("should set compression to 'gzip' if Accept-Encoding contains 'gzip' and User-Agent is not IE6", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes",
          {
            headers: {
              "Accept-Encoding": "gzip",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "gzip");
      });
      it("should set compression to '' if Accept-Encoding contains 'gzip' and User-Agent is IE6", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes",
          {
            headers: {
              "Accept-Encoding": "gzip",
              "User-Agent": "MSIE 6",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "");
      });
      it("should set compression to '' if Accept-Encoding is not 'br' or 'gzip' ", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes",
          {
            headers: {
              "Accept-Encoding": "identity",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "");
      });
      it("should set ua to the normalised user-agent", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.ua), "other/0.0.0");
      });
      it("should set ua to the normalised user-agent", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=yes",
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.220 Safari/537.36",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.ua), "chrome/65.0.0");
      });
    });

    it("uses features if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.features), "a,b,c");
    });
    it("uses excludes if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=a%2Cb,c&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.excludes), "a,b,c");
    });
    it("uses rum if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?rum=1&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.rum), "1");
    });
    it("uses unknown if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?unknown=ignore&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.unknown), "ignore");
    });
    it("uses flags if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?flags=always&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.flags), "always");
    });
    it("uses version if set to a version in the service (3.25.1)", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.1&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.version), "3.25.1");
    });
    it("uses version if set to a version in the service (3.27.4)", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.27.4&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.version), "3.27.4");
    });
    it("uses callback if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=ready&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.callback), "ready");
    });
    it("uses compression if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?compression=quack&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.compression), "quack");
    });
    it("uses ua if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?ua=carrot/1.2.3&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.ua), "carrot/1.2.3");
    });

    it("should sort features parameter", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?features=fetch,atob%2CIntersectionObserver&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(
        decodeURIComponent(response.data.features),
        "IntersectionObserver,atob,fetch"
      );
    });

    it("should sort excludes parameter", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=Map,Array.from%2CSymbol,atob&use-compute-at-edge-backend=yes"
      );
      assert.deepStrictEqual(
        decodeURIComponent(response.data.excludes),
        "Array.from,Map,Symbol,atob"
      );
    });
  });

  context('vcl service', function () {
    describe("Default values", function () {
      it("should set features to 'default'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.features), "default");
      });
      it("should set excludes to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.excludes), "");
      });
      it("should set rum to '0'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.rum), "0");
      });
      it("should set unknown to 'polyfill'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.unknown), "polyfill");
      });
      it("should set flags to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.flags), "");
      });
      it("should set version to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.version), "");
      });
      it("should set callback to ''", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.callback), "");
      });
      it("should set compression to 'br' if Accept-Encoding contains 'br'", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no",
          {
            headers: {
              "Accept-Encoding": "br",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "br");
      });
      it("should set compression to 'gzip' if Accept-Encoding contains 'gzip' and User-Agent is not IE6", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no",
          {
            headers: {
              "Accept-Encoding": "gzip",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "gzip");
      });
      it("should set compression to '' if Accept-Encoding contains 'gzip' and User-Agent is IE6", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no",
          {
            headers: {
              "Accept-Encoding": "gzip",
              "User-Agent": "MSIE 6",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "");
      });
      it("should set compression to '' if Accept-Encoding is not 'br' or 'gzip' ", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no",
          {
            headers: {
              "Accept-Encoding": "identity",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.compression), "");
      });
      it("should set ua to the normalised user-agent", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no"
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.ua), "other/0.0.0");
      });
      it("should set ua to the normalised user-agent", async function () {
        const response = await axios.get(
          "/v3/normalise_querystring_parameters_for_polyfill_bundle?use-compute-at-edge-backend=no",
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.220 Safari/537.36",
            },
          }
        );
        assert.deepStrictEqual(decodeURIComponent(response.data.ua), "chrome/65.0.0");
      });
    });

    it("uses features if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?features=a,b%2Cc&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.features), "a,b,c");
    });
    it("uses excludes if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=a%2Cb,c&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.excludes), "a,b,c");
    });
    it("uses rum if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?rum=1&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.rum), "1");
    });
    it("uses unknown if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?unknown=ignore&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.unknown), "ignore");
    });
    it("uses flags if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?flags=always&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.flags), "always");
    });
    it("uses version if set to a version in the service (3.25.1)", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.25.1&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.version), "3.25.1");
    });
    it("uses version if set to a version in the service (3.27.4)", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?version=3.27.4&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.version), "3.27.4");
    });
    it("uses callback if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?callback=ready&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.callback), "ready");
    });
    it("uses compression if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?compression=quack&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.compression), "quack");
    });
    it("uses ua if set", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?ua=carrot/1.2.3&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(decodeURIComponent(response.data.ua), "carrot/1.2.3");
    });

    it("should sort features parameter", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?features=fetch,atob%2CIntersectionObserver&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(
        decodeURIComponent(response.data.features),
        "IntersectionObserver,atob,fetch"
      );
    });

    it("should sort excludes parameter", async function () {
      const response = await axios.get(
        "/v3/normalise_querystring_parameters_for_polyfill_bundle?excludes=Map,Array.from%2CSymbol,atob&use-compute-at-edge-backend=no"
      );
      assert.deepStrictEqual(
        decodeURIComponent(response.data.excludes),
        "Array.from,Map,Symbol,atob"
      );
    });
  });
});
