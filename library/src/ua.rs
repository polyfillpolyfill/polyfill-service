use std::collections::HashMap;

use nodejs_semver::{Range, Version};
use regex::Regex;

use crate::useragent::useragent;

pub trait UserAgent {
    fn new(ua_string: &str) -> Self;
	fn get_family(&self) -> String;
	fn satisfies(&self, range: String) -> bool;
	fn meets_baseline(&self) -> bool;
	fn is_unknown(&self) -> bool;
	fn get_baselines() -> HashMap<String, String>;
}

/// JavaScript's
/// [MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).
/// This is used to determine the maximum value for integer components in a
/// JS-compatible way.
pub const MAX_SAFE_INTEGER: u64 = 900_719_925_474_099;

#[derive(Clone, Default, Debug)]
pub struct UA {
    version: String,
    family: String,
}

impl UserAgent for UA {
    fn new(ua_string: &str) -> Self {
        // println!("ua_string: {}", ua_string);
        let mut family: String;
        let mut major: String;
        let mut minor: String;
        let re: Regex = Regex::new(r"(?i)^(\w+)/(\d+)\.?(\d+)?\.?(\d+)?$").unwrap();
        if let Some(normalized) = re.captures(ua_string) {
            // println!("normalized: {:#?}", normalized);
            family = normalized.get(1).map(Into::<&str>::into).unwrap().into();
            major = normalized.get(2).map(Into::<&str>::into).unwrap().into();
            minor = normalized
                .get(3)
                .map_or("0", Into::<&str>::into)
                .to_owned();
        } else {
            // Google Search iOS app should be detected as the underlying browser, which is safari on iOS
            let ua_string = Regex::new(r"(?i) GSA\/[\d.]+")
                .unwrap()
                .replace(ua_string, "");

            // Instagram should be detected as the underlying browser, which is safari on ios
            let ua_string = Regex::new(r"(?i) Instagram [\d.]+")
                .unwrap()
                .replace(&ua_string, "");

            // WebPageTest is not a real browser, remove the token to find the underlying browser
            let ua_string = Regex::new(r"(?i) PTST\/[\d.]+")
                .unwrap()
                .replace(&ua_string, "");

            // Waterfox is a Firefox fork, we can remove the Waterfox identifiers and parse the result as Firefox
            let ua_string = Regex::new(r"(?i) Waterfox\/[\d.]+")
                .unwrap()
                .replace(&ua_string, "");

            // Pale Moon has a Firefox-compat UA string, we can remove the Pale Moon and Goanna identifiers and parse the result as Firefox
            let ua_string = Regex::new(r"(?i) Goanna\/[\d.]+")
                .unwrap()
                .replace(&ua_string, "");

            // Pale Moon has a Firefox-compat UA string, we can remove the Pale Moon and Goanna identifiers and parse the result as Firefox
            let ua_string = Regex::new(r"(?i) PaleMoon\/[\d.]+")
                .unwrap()
                .replace(&ua_string, "");

            // Yandex browser is recognised by UA module but is actually Chromium under the hood, so better to remove the Yandex identifier and get the UA module to detect it as Chrome
            let ua_string = Regex::new(r"(?i)(YaBrowser)\/(\d+\.)+\d+ /")
                .unwrap()
                .replace(&ua_string, "");

            // Crosswalk browser is recognised by UA module but is actually Chromium under the hood, so better to remove the identifier and get the UA module to detect it as Chrome
            let ua_string = Regex::new(r"(?i) (Crosswalk)\/(\d+)\.(\d+)\.(\d+)\.(\d+)")
                .unwrap()
                .replace(&ua_string, "");

            // Chrome and Opera on iOS uses a UIWebView of the underlying platform to render content. By stripping the CriOS or OPiOS strings, the useragent parser will alias the user agent to ios_saf for the UIWebView, which is closer to the actual renderer
            let ua_string = Regex::new(
                r"(?i)((CriOS|OPiOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|(FxiOS\/(\d+)\.(\d+)))",
            )
            .unwrap()
            .replace(&ua_string, "");

            // Vivaldi browser is recognised by UA module but is actually identical to Chrome, so the best way to get accurate targeting is to remove the vivaldi token from the UA
            let ua_string = Regex::new(r"(?i) vivaldi\/[\d.]+\d+")
                .unwrap()
                .replace(&ua_string, "");

            // Facebook in-app browser `[FBAN/.....]` or `[FB_IAB/.....]` (see https://github.com/Financial-Times/polyfill-servicessues/990)
            let ua_string = Regex::new(r"(?i) \[(FB_IAB|FBAN|FBIOS|FB4A)\/[^\]]+\]")
                .unwrap()
                .replace(&ua_string, "");

            // Electron/X.Y.Z` (see https://github.com/Financial-Times/polyfill-servicessues/1129)
            let ua_string = Regex::new(r"(?i) Electron\/[\d.]+\d+")
                .unwrap()
                .replace(&ua_string, "");

            // Chromium-based Edge
            let ua_string = Regex::new(r"(?i) Edg\/[\d.]+\d+")
                .unwrap()
                .replace(&ua_string, "");

            // Modern mobile Googlebot which uses modern Chrome
            let ua_string = Regex::new(
                r"(?i)Safari.* Googlebot\/2\.1; \+http:\/\/www\.google\.com\/bot\.html\)",
            )
            .unwrap()
            .replace(&ua_string, "");

            // Modern desktop Googlebot which uses modern Chrome
            let ua_string =
                Regex::new(r"(?i) Googlebot\/2\.1; \+http:\/\/www\.google\.com\/bot\.html\) ")
                    .unwrap()
                    .replace(&ua_string, "");

            let ua = useragent(&ua_string);
            // println!("ua: {:#?}", ua);
            family = ua[0].clone().to_lowercase();
            major = ua[1].clone();
            minor = ua[2].clone();
        }
        if family == "blackberry webkit" {
            family = "bb".to_owned();
        }
        if family == "blackberry" {
            family = "bb".to_owned();
        }
        if family == "pale moon (firefox variant)" {
            family = "firefox".to_owned();
        }
        if family == "pale moon" {
            family = "firefox".to_owned();
        }
        if family == "firefox mobile" {
            family = "firefox_mob".to_owned();
        }
        if family == "firefox namoroka" {
            family = "firefox".to_owned();
        }
        if family == "firefox shiretoko" {
            family = "firefox".to_owned();
        }
        if family == "firefox minefield" {
            family = "firefox".to_owned();
        }
        if family == "firefox alpha" {
            family = "firefox".to_owned();
        }
        if family == "firefox beta" {
            family = "firefox".to_owned();
        }
        if family == "microb" {
            family = "firefox".to_owned();
        }
        if family == "mozilladeveloperpreview" {
            family = "firefox".to_owned();
        }
        if family == "iceweasel" {
            family = "firefox".to_owned();
        }
        if family == "opera tablet" {
            family = "opera".to_owned();
        }
        if family == "opera mobile" {
            family = "op_mob".to_owned();
        }
        if family == "opera mini" {
            family = "op_mini".to_owned();
        }
        if family == "chrome mobile webview" {
            family = "chrome".to_owned();
        }
        if family == "chrome mobile" {
            family = "chrome".to_owned();
        }
        if family == "chrome frame" {
            family = "chrome".to_owned();
        }
        if family == "chromium" {
            family = "chrome".to_owned();
        }
        if family == "headlesschrome" {
            family = "chrome".to_owned();
        }
        if family == "ie mobile" {
            family = "ie_mob".to_owned();
        }
        if family == "ie large screen" {
            family = "ie".to_owned();
        }
        if family == "internet explorer" {
            family = "ie".to_owned();
        }
        if family == "edge mobile" {
            family = "edge_mob".to_owned();
        }
        if family == "uc browser" && major == "9" && minor == "9" {
            family = "ie".to_owned();
            major = "10".to_owned();
            minor = "0".to_owned();
        }
        if family == "chrome mobile ios" {
            family = "ios_chr".to_owned();
        }
        if family == "mobile safari" {
            family = "ios_saf".to_owned();
        }
        if family == "iphone" {
            family = "ios_saf".to_owned();
        }
        if family == "iphone simulator" {
            family = "ios_saf".to_owned();
        }
        if family == "mobile safari uiwebview" {
            family = "ios_saf".to_owned();
        }
        if family == "mobile safari ui/wkwebview" {
            family = "ios_saf".to_owned();
        }
        if family == "mobile safari/wkwebview" {
            family = "ios_saf".to_owned();
        }
        if family == "samsung internet" {
            family = "samsung_mob".to_owned();
        }
        if family == "phantomjs" {
            family = "safari".to_owned();
            major = "5".to_owned();
            minor = "0".to_owned();
        }
        if family == "opera" {
            if family == "opera" && major == "20" {
                family = "chrome".to_owned();
                major = "33".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "21" {
                family = "chrome".to_owned();
                major = "34".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "22" {
                family = "chrome".to_owned();
                major = "35".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "23" {
                family = "chrome".to_owned();
                major = "36".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "24" {
                family = "chrome".to_owned();
                major = "37".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "25" {
                family = "chrome".to_owned();
                major = "38".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "26" {
                family = "chrome".to_owned();
                major = "39".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "27" {
                family = "chrome".to_owned();
                major = "40".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "28" {
                family = "chrome".to_owned();
                major = "41".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "29" {
                family = "chrome".to_owned();
                major = "42".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "30" {
                family = "chrome".to_owned();
                major = "43".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "31" {
                family = "chrome".to_owned();
                major = "44".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "32" {
                family = "chrome".to_owned();
                major = "45".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "33" {
                family = "chrome".to_owned();
                major = "46".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "34" {
                family = "chrome".to_owned();
                major = "47".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "35" {
                family = "chrome".to_owned();
                major = "48".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "36" {
                family = "chrome".to_owned();
                major = "49".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "37" {
                family = "chrome".to_owned();
                major = "50".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "38" {
                family = "chrome".to_owned();
                major = "51".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "39" {
                family = "chrome".to_owned();
                major = "52".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "40" {
                family = "chrome".to_owned();
                major = "53".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "41" {
                family = "chrome".to_owned();
                major = "54".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "42" {
                family = "chrome".to_owned();
                major = "55".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "43" {
                family = "chrome".to_owned();
                major = "56".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "44" {
                family = "chrome".to_owned();
                major = "57".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "45" {
                family = "chrome".to_owned();
                major = "58".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "46" {
                family = "chrome".to_owned();
                major = "59".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "47" {
                family = "chrome".to_owned();
                major = "60".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "48" {
                family = "chrome".to_owned();
                major = "61".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "49" {
                family = "chrome".to_owned();
                major = "62".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "50" {
                family = "chrome".to_owned();
                major = "63".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "51" {
                family = "chrome".to_owned();
                major = "64".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "52" {
                family = "chrome".to_owned();
                major = "65".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "53" {
                family = "chrome".to_owned();
                major = "66".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "54" {
                family = "chrome".to_owned();
                major = "67".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "55" {
                family = "chrome".to_owned();
                major = "68".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "56" {
                family = "chrome".to_owned();
                major = "69".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "57" {
                family = "chrome".to_owned();
                major = "70".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "58" {
                family = "chrome".to_owned();
                major = "71".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "59" {
                family = "chrome".to_owned();
                major = "72".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "60" {
                family = "chrome".to_owned();
                major = "73".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "61" {
                family = "chrome".to_owned();
                major = "74".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "62" {
                family = "chrome".to_owned();
                major = "75".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "63" {
                family = "chrome".to_owned();
                major = "76".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "64" {
                family = "chrome".to_owned();
                major = "77".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "65" {
                family = "chrome".to_owned();
                major = "78".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "66" {
                family = "chrome".to_owned();
                major = "79".to_owned();
                minor = "0".to_owned();
            }
            if family == "opera" && major == "67" {
                family = "chrome".to_owned();
                major = "80".to_owned();
                minor = "0".to_owned();
            }
        }
        if family == "googlebot" && major == "2" && minor == "1" {
            family = "chrome".to_owned();
            major = "41".to_owned();
            minor = "0".to_owned();
        }
        if family == "edge"
            || family == "edge_mob"
            || (family == "ie" && major.parse::<u64>().unwrap_or(0) >= 8)
            || (family == "ie_mob" && major.parse::<u64>().unwrap_or(0) >= 11)
            || (family == "chrome" && major.parse::<u64>().unwrap_or(0) >= 29)
            || (family == "safari" && major.parse::<u64>().unwrap_or(0) >= 9)
            || (family == "ios_saf" && major.parse::<u64>().unwrap_or(0) >= 9)
            || (family == "ios_chr" && major.parse::<u64>().unwrap_or(0) >= 9)
            || (family == "firefox" && major.parse::<u64>().unwrap_or(0) >= 38)
            || (family == "firefox_mob" && major.parse::<u64>().unwrap_or(0) >= 38)
            || (family == "android" && format!("{major}.{minor}").parse::<f64>().unwrap_or(0.0) >= 4.3)
            || (family == "opera" && major.parse::<u64>().unwrap_or(0) >= 33)
            || (family == "op_mob" && major.parse::<u64>().unwrap_or(0) >= 10)
            || (family == "op_mini" && major.parse::<u64>().unwrap_or(0) >= 5)
            || (family == "bb" && major.parse::<u64>().unwrap_or(0) >= 6)
            || (family == "samsung_mob" && major.parse::<u64>().unwrap_or(0) >= 4)
        {
            /*empty*/
        } else {
            family = "other".to_owned();
            major = "0".to_owned();
            minor = "0".to_owned();
        }

		let mut major: u64 = major.parse().unwrap_or(0);
		let mut minor: u64 = minor.parse().unwrap_or(0);

		if major > MAX_SAFE_INTEGER {
			major = MAX_SAFE_INTEGER;
		}

		if minor > MAX_SAFE_INTEGER {
			minor = MAX_SAFE_INTEGER;
		}

        let version = format!("{major}.{minor}.0");

        // println!("ua norm: {}/{}", family, version);
        Self {
            version,
            family,
        }
    }

    fn get_family(&self) -> String {
        self.family.clone()
    }

    fn satisfies(&self, range: String) -> bool {
        let req: Range = range.parse().unwrap_or_else(|_| panic!("err: {}", range));
        let version: Version = self
            .version
            .parse()
            .unwrap_or_else(|_| panic!("err: {}", self.version));
        // println!("req: {:#?}", req);
        // println!("version: {:#?}", version);
        version.satisfies(&req)
    }

    fn meets_baseline(&self) -> bool {
        let family = &self.family;
        match Self::get_baselines().get(family) {
            Some(family) => {
                let range = format!(">={family}");
                self.satisfies(range)
            }
            None => false,
        }
    }

    fn is_unknown(&self) -> bool {
        !Self::get_baselines().contains_key(&self.family) || !self.meets_baseline()
    }

    fn get_baselines() -> HashMap<String, String> {
        let mut b: HashMap<String, String> = HashMap::new();
        b.insert("edge".to_owned(), "*".to_owned());
        b.insert("edge_mob".to_owned(), "*".to_owned());
        b.insert("ie".to_owned(), "8".to_owned());
        b.insert("ie_mob".to_owned(), "11".to_owned());
        b.insert("chrome".to_owned(), "29".to_owned());
        b.insert("safari".to_owned(), "9".to_owned());
        b.insert("ios_saf".to_owned(), "9".to_owned());
        b.insert("ios_chr".to_owned(), "9".to_owned());
        b.insert("firefox".to_owned(), "38".to_owned());
        b.insert("firefox_mob".to_owned(), "38".to_owned());
        b.insert("android".to_owned(), "4.3".to_owned());
        b.insert("opera".to_owned(), "33".to_owned());
        b.insert("op_mob".to_owned(), "10".to_owned());
        b.insert("op_mini".to_owned(), "5".to_owned());
        b.insert("bb".to_owned(), "6".to_owned());
        b.insert("samsung_mob".to_owned(), "4".to_owned());
        b
    }
}
