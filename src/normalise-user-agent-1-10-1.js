"use strict";

import {useragent_parser as useragent } from "./ua-parser.js";
import semver from "semver";

export function UA(uaString) {
  let normalized;
  if (!uaString) {
    this.ua = {};
    this.ua.family = "other";
    this.ua.major = "0";
    this.ua.minor = "0";
    this.ua.patch = "0";
  } else {
    if (
      (normalized = uaString.match(/^(\w+)\/(\d+)(?:\.(\d+)(?:\.(\d+))?)?$/i))
    ) {
      this.ua = {
        family: normalized[1].toLowerCase(),
        major: normalized[2],
        minor: normalized[3] || "0",
        patch: "0",
      };
    } else {
      // Google Search iOS app should be detected as the underlying browser, which is safari on iOS
      uaString = uaString.replace(/ GSA\/[\d.]+/i, "");

      // Instagram should be detected as the underlying browser, which is safari on ios
      uaString = uaString.replace(/ Instagram [\d.]+/i, "");

      // WebPageTest is not a real browser, remove the token to find the underlying browser
      uaString = uaString.replace(/ PTST\/[\d.]+/i, "");

      // Waterfox is a Firefox fork, we can remove the Waterfox identifiers and parse the result as Firefox
      uaString = uaString.replace(/ Waterfox\/[\d.]+/i, "");

      // Pale Moon has a Firefox-compat UA string, we can remove the Pale Moon and Goanna identifiers and parse the result as Firefox
      uaString = uaString.replace(/ Goanna\/[\d.]+/i, "");

      // Pale Moon has a Firefox-compat UA string, we can remove the Pale Moon and Goanna identifiers and parse the result as Firefox
      uaString = uaString.replace(/ PaleMoon\/[\d.]+/i, "");

      // Yandex browser is recognised by UA module but is actually Chromium under the hood, so better to remove the Yandex identifier and get the UA module to detect it as Chrome
      uaString = uaString.replace(/(YaBrowser)\/(\d+\.)+\d+ /, "");

      // Crosswalk browser is recognised by UA module but is actually Chromium under the hood, so better to remove the identifier and get the UA module to detect it as Chrome
      uaString = uaString.replace(
        / (Crosswalk)\/(\d+)\.(\d+)\.(\d+)\.(\d+)/i,
        ""
      );

      // Chrome and Opera on iOS uses a UIWebView of the underlying platform to render content. By stripping the CriOS or OPiOS strings, the useragent parser will alias the user agent to ios_saf for the UIWebView, which is closer to the actual renderer
      uaString = uaString.replace(
        /((CriOS|OPiOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|(FxiOS\/(\d+)\.(\d+)))/,
        ""
      );

      // Vivaldi browser is recognised by UA module but is actually identical to Chrome, so the best way to get accurate targeting is to remove the vivaldi token from the UA
      uaString = uaString.replace(/ vivaldi\/[\d.]+\d+/i, "");

      // Facebook in-app browser `[FBAN/.....]` or `[FB_IAB/.....]` (see https://github.com/Financial-Times/polyfill-service/issues/990)
      uaString = uaString.replace(/ \[(FB_IAB|FBAN|FBIOS|FB4A)\/[^\]]+\]/i, "");

      // Electron/X.Y.Z` (see https://github.com/Financial-Times/polyfill-service/issues/1129)
      uaString = uaString.replace(/ Electron\/[\d.]+\d+/i, "");

      // Chromium-based Edge
      uaString = uaString.replace(/ Edg\/[\d.]+\d+/i, "");

      // Modern mobile Googlebot which uses modern Chrome
      uaString = uaString.replace(
        /Safari.* Googlebot\/2\.1; \+http:\/\/www\.google\.com\/bot\.html\)/i,
        ""
      );

      // Modern desktop Googlebot which uses modern Chrome
      uaString = uaString.replace(
        / Googlebot\/2\.1; \+http:\/\/www\.google\.com\/bot\.html\) /i,
        ""
      );

      this.ua = useragent(uaString);

      this.ua.patch = "0";

      this.ua.family = this.ua.family.toLowerCase();
    }
    if (this.ua.family === "blackberry webkit") {
      this.ua.family = "bb";
    }
    if (this.ua.family === "blackberry") {
      this.ua.family = "bb";
    }
    if (this.ua.family === "pale moon (firefox variant)") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "pale moon") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "firefox mobile") {
      this.ua.family = "firefox_mob";
    }
    if (this.ua.family === "firefox namoroka") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "firefox shiretoko") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "firefox minefield") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "firefox alpha") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "firefox beta") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "microb") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "mozilladeveloperpreview") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "iceweasel") {
      this.ua.family = "firefox";
    }
    if (this.ua.family === "opera tablet") {
      this.ua.family = "opera";
    }
    if (this.ua.family === "opera mobile") {
      this.ua.family = "op_mob";
    }
    if (this.ua.family === "opera mini") {
      this.ua.family = "op_mini";
    }
    if (this.ua.family === "chrome mobile webview") {
      this.ua.family = "chrome";
    }
    if (this.ua.family === "chrome mobile") {
      this.ua.family = "chrome";
    }
    if (this.ua.family === "chrome frame") {
      this.ua.family = "chrome";
    }
    if (this.ua.family === "chromium") {
      this.ua.family = "chrome";
    }
    if (this.ua.family === "headlesschrome") {
      this.ua.family = "chrome";
    }
    if (this.ua.family === "ie mobile") {
      this.ua.family = "ie_mob";
    }
    if (this.ua.family === "ie large screen") {
      this.ua.family = "ie";
    }
    if (this.ua.family === "internet explorer") {
      this.ua.family = "ie";
    }
    if (this.ua.family === "edge mobile") {
      this.ua.family = "edge_mob";
    }
    if (this.ua.family === "uc browser") {
      if (
        this.ua.family === "uc browser" &&
        this.ua.major === "9" &&
        this.ua.minor === "9"
      ) {
        this.ua.family = "ie";
        this.ua.major = "10";
        this.ua.minor = "0";
      }
    }
    if (this.ua.family === "chrome mobile ios") {
      this.ua.family = "ios_chr";
    }
    if (this.ua.family === "mobile safari") {
      this.ua.family = "ios_saf";
    }
    if (this.ua.family === "iphone") {
      this.ua.family = "ios_saf";
    }
    if (this.ua.family === "iphone simulator") {
      this.ua.family = "ios_saf";
    }
    if (this.ua.family === "mobile safari uiwebview") {
      this.ua.family = "ios_saf";
    }
    if (this.ua.family === "mobile safari ui/wkwebview") {
      this.ua.family = "ios_saf";
    }
    if (this.ua.family === "mobile safari/wkwebview") {
      this.ua.family = "ios_saf";
    }
    if (this.ua.family === "samsung internet") {
      this.ua.family = "samsung_mob";
    }
    if (this.ua.family === "phantomjs") {
      this.ua.family = "safari";
      this.ua.major = "5";
      this.ua.minor = "0";
    }
    if (this.ua.family === "opera") {
      if (this.ua.family === "opera" && this.ua.major === "20") {
        this.ua.family = "chrome";
        this.ua.major = "33";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "21") {
        this.ua.family = "chrome";
        this.ua.major = "34";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "22") {
        this.ua.family = "chrome";
        this.ua.major = "35";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "23") {
        this.ua.family = "chrome";
        this.ua.major = "36";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "24") {
        this.ua.family = "chrome";
        this.ua.major = "37";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "25") {
        this.ua.family = "chrome";
        this.ua.major = "38";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "26") {
        this.ua.family = "chrome";
        this.ua.major = "39";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "27") {
        this.ua.family = "chrome";
        this.ua.major = "40";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "28") {
        this.ua.family = "chrome";
        this.ua.major = "41";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "29") {
        this.ua.family = "chrome";
        this.ua.major = "42";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "30") {
        this.ua.family = "chrome";
        this.ua.major = "43";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "31") {
        this.ua.family = "chrome";
        this.ua.major = "44";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "32") {
        this.ua.family = "chrome";
        this.ua.major = "45";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "33") {
        this.ua.family = "chrome";
        this.ua.major = "46";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "34") {
        this.ua.family = "chrome";
        this.ua.major = "47";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "35") {
        this.ua.family = "chrome";
        this.ua.major = "48";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "36") {
        this.ua.family = "chrome";
        this.ua.major = "49";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "37") {
        this.ua.family = "chrome";
        this.ua.major = "50";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "38") {
        this.ua.family = "chrome";
        this.ua.major = "51";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "39") {
        this.ua.family = "chrome";
        this.ua.major = "52";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "40") {
        this.ua.family = "chrome";
        this.ua.major = "53";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "41") {
        this.ua.family = "chrome";
        this.ua.major = "54";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "42") {
        this.ua.family = "chrome";
        this.ua.major = "55";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "43") {
        this.ua.family = "chrome";
        this.ua.major = "56";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "44") {
        this.ua.family = "chrome";
        this.ua.major = "57";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "45") {
        this.ua.family = "chrome";
        this.ua.major = "58";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "46") {
        this.ua.family = "chrome";
        this.ua.major = "59";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "47") {
        this.ua.family = "chrome";
        this.ua.major = "60";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "48") {
        this.ua.family = "chrome";
        this.ua.major = "61";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "49") {
        this.ua.family = "chrome";
        this.ua.major = "62";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "50") {
        this.ua.family = "chrome";
        this.ua.major = "63";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "51") {
        this.ua.family = "chrome";
        this.ua.major = "64";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "52") {
        this.ua.family = "chrome";
        this.ua.major = "65";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "53") {
        this.ua.family = "chrome";
        this.ua.major = "66";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "54") {
        this.ua.family = "chrome";
        this.ua.major = "67";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "55") {
        this.ua.family = "chrome";
        this.ua.major = "68";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "56") {
        this.ua.family = "chrome";
        this.ua.major = "69";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "57") {
        this.ua.family = "chrome";
        this.ua.major = "70";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "58") {
        this.ua.family = "chrome";
        this.ua.major = "71";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "59") {
        this.ua.family = "chrome";
        this.ua.major = "72";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "60") {
        this.ua.family = "chrome";
        this.ua.major = "73";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "61") {
        this.ua.family = "chrome";
        this.ua.major = "74";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "62") {
        this.ua.family = "chrome";
        this.ua.major = "75";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "63") {
        this.ua.family = "chrome";
        this.ua.major = "76";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "64") {
        this.ua.family = "chrome";
        this.ua.major = "77";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "65") {
        this.ua.family = "chrome";
        this.ua.major = "78";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "66") {
        this.ua.family = "chrome";
        this.ua.major = "79";
        this.ua.minor = "0";
      }
      if (this.ua.family === "opera" && this.ua.major === "67") {
        this.ua.family = "chrome";
        this.ua.major = "80";
        this.ua.minor = "0";
      }
    }
    if (this.ua.family === "googlebot") {
      if (
        this.ua.family === "googlebot" &&
        this.ua.major === "2" &&
        this.ua.minor === "1"
      ) {
        this.ua.family = "chrome";
        this.ua.major = "41";
        this.ua.minor = "0";
      }
    }
    if (
      false ||
      this.ua.family === "edge" ||
      this.ua.family === "edge_mob" ||
      (this.ua.family === "ie" && Number(this.ua.major) >= 8) ||
      (this.ua.family === "ie_mob" && Number(this.ua.major) >= 11) ||
      (this.ua.family === "chrome" && Number(this.ua.major) >= 29) ||
      (this.ua.family === "safari" && Number(this.ua.major) >= 9) ||
      (this.ua.family === "ios_saf" && Number(this.ua.major) >= 9) ||
      (this.ua.family === "ios_chr" && Number(this.ua.major) >= 9) ||
      (this.ua.family === "firefox" && Number(this.ua.major) >= 38) ||
      (this.ua.family === "firefox_mob" && Number(this.ua.major) >= 38) ||
      (this.ua.family === "android" &&
        Number(this.ua.major + "." + this.ua.minor) >= 4.3) ||
      (this.ua.family === "opera" && Number(this.ua.major) >= 33) ||
      (this.ua.family === "op_mob" && Number(this.ua.major) >= 10) ||
      (this.ua.family === "op_mini" && Number(this.ua.major) >= 5) ||
      (this.ua.family === "bb" && Number(this.ua.major) >= 6) ||
      (this.ua.family === "samsung_mob" && Number(this.ua.major) >= 4)
    ) {
      /*empty*/
    } else {
      this.ua.family = "other";
      this.ua.major = "0";
      this.ua.minor = "0";
      this.ua.patch = "0";
    }
  }
  this.version =
    (Number(this.ua.major) || 0) + "." + (Number(this.ua.minor) || 0) + ".0";
}

UA.prototype.getFamily = function () {
  return this.ua.family;
};

UA.prototype.getVersion = function () {
  return this.version;
};

UA.prototype.satisfies = function (range) {
  return semver.satisfies(this.version, range);
};

UA.prototype.getBaseline = function () {
  return UA.getBaselines()[this.ua.family];
};

UA.prototype.meetsBaseline = function () {
  return semver.satisfies(
    this.version,
    ">=" + UA.getBaselines()[this.ua.family]
  );
};

UA.prototype.isUnknown = function () {
  return (
    Object.keys(UA.getBaselines()).indexOf(this.ua.family) === -1 ||
    !this.meetsBaseline()
  );
};

UA.normalize = function (uaString) {
  const ua = new UA(uaString);
  return ua.getFamily() + "/" + ua.version;
};

UA.getBaselines = function () {
  return {
    edge: "*",
    edge_mob: "*",
    ie: "8",
    ie_mob: "11",
    chrome: "29",
    safari: "9",
    ios_saf: "9",
    ios_chr: "9",
    firefox: "38",
    firefox_mob: "38",
    android: "4.3",
    opera: "33",
    op_mob: "10",
    op_mini: "5",
    bb: "6",
    samsung_mob: "4",
  };
};
