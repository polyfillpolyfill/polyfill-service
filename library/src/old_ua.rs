use std::collections::HashMap;

use regex::Regex;
use semver::{VersionReq, Version};
use serde::Deserialize;

use crate::{parse::parse, ua::UserAgent};

#[allow(dead_code)]
#[derive(Deserialize)]
struct OldBrowsers {
    android: Option<String>,
    bb: Option<String>,
    chrome: Option<String>,
    firefox: Option<String>,
    firefox_mob: Option<String>,
    ie: Option<String>,
    ie_mob: Option<String>,
    ios_saf: Option<String>,
    op_mini: Option<String>,
    opera: Option<String>,
    safari: Option<String>,
    samsung_mob: Option<String>,
}

#[derive(Clone, Default, Debug)]
pub struct OldUA {
    version: String,
    family: String,
}

impl UserAgent for OldUA {
    fn new(ua_string: &str) -> Self {
        let mut family: String;
        let mut major: String;
        let mut minor: String;
        // let mut patch: String = "0".to_owned();
        let re: Regex = Regex::new(r"(?i)^(\w+)\/(\d+)(?:\.(\d+){2})?$").unwrap();
        if let Some(normalized) = re.captures(ua_string) {
            family = normalized.get(1).map(Into::<&str>::into).unwrap().into();
            major = normalized.get(2).map(Into::<&str>::into).unwrap().into();
            minor = normalized
                .get(3)
                .map_or("0", Into::<&str>::into)
                .to_owned();
        } else {
            // Chrome and Opera on iOS uses a UIWebView of the underlying platform to render content. By stripping the CriOS or OPiOS strings, the useragent parser will alias the user agent to ios_saf for the UIWebView, which is closer to the actual renderer
            let ua_string = Regex::new(
                r"(?i)((CriOS|OPiOS)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|(FxiOS\/(\d+)\.(\d+)))",
            )
            .unwrap()
            .replace(ua_string, "");

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


            let ua = parse(&ua_string);
            family = ua[0].clone();
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
        if family == "ie mobile" {
            family = "ie_mob".to_owned();
        }
        if family == "ie large screen" {
            family = "ie".to_owned();
        }
        if family == "internet explorer" {
            family = "ie".to_owned();
        }
        if family == "edge" {
            family = "ie".to_owned();
        }
        if family == "edge mobile" {
            family = "ie".to_owned();
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
        }
        if family == "googlebot" && major == "2" && minor == "1" {
            family = "chrome".to_owned();
            major = "41".to_owned();
            minor = "0".to_owned();
        }
        if family == "chrome"
            || (family == "ie" && major.parse::<i32>().unwrap() >= 7)
            || (family == "ie_mob" && major.parse::<i32>().unwrap() >= 8)
            || (family == "safari" && major.parse::<i32>().unwrap() >= 4)
            || (family == "ios_saf" && major.parse::<i32>().unwrap() >= 4)
            || (family == "ios_chr" && major.parse::<i32>().unwrap() >= 4)
            || (family == "firefox" && format!("{major}.{minor}").parse::<f32>().unwrap() >= 3.6)
            || (family == "firefox_mob" && major.parse::<i32>().unwrap() >= 4)
            || (family == "android" && major.parse::<i32>().unwrap() >= 3)
            || (family == "opera" && major.parse::<i32>().unwrap() >= 11)
            || (family == "op_mob" && major.parse::<i32>().unwrap() >= 10)
            || (family == "op_mini" && major.parse::<i32>().unwrap() >= 5)
            || (family == "bb" && major.parse::<i32>().unwrap() >= 6)
            || (family == "samsung_mob" && major.parse::<i32>().unwrap() >= 4)
        {
            /*empty*/
        } else {
            family = "other".to_owned();
            major = "0".to_owned();
            minor = "0".to_owned();
            // patch = "0".to_owned();
        }

        let version = format!("{major}.{minor}.0");
        // println!("{}/{}", family, version);

        Self {
            version,
            family,
            // major: major.to_owned(),
            // minor: minor.to_owned(),
            // patch: patch.to_owned(),
        }
    }

    fn get_family(&self) -> String {
        self.family.clone()
    }

    fn satisfies(&self, range: String) -> bool {
        let req = VersionReq::parse(&range).unwrap();
        let version = Version::parse(&self.version).unwrap();
        req.matches(&version)
    }

    fn meets_baseline(&self) -> bool {
        let family = &self.family;
        let range = format!(">={}", Self::get_baselines().get(family).unwrap());
        self.satisfies(range)
    }

    fn is_unknown(&self) -> bool {
        !Self::get_baselines().contains_key(&self.family) || !self.meets_baseline()
    }

    fn get_baselines() -> HashMap<String, String> {
        let mut b: HashMap<String, String> = HashMap::new();
        b.insert("ie".to_owned(), "7".to_owned());
        b.insert("ie_mob".to_owned(), "8".to_owned());
        b.insert("chrome".to_owned(), "*".to_owned());
        b.insert("safari".to_owned(), "4".to_owned());
        b.insert("ios_saf".to_owned(), "4".to_owned());
        b.insert("ios_chr".to_owned(), "4".to_owned());
        b.insert("firefox".to_owned(), "3.6".to_owned());
        b.insert("firefox_mob".to_owned(), "4".to_owned());
        b.insert("android".to_owned(), "3".to_owned());
        b.insert("opera".to_owned(), "11".to_owned());
        b.insert("op_mob".to_owned(), "10".to_owned());
        b.insert("op_mini".to_owned(), "5".to_owned());
        b.insert("bb".to_owned(), "6".to_owned());
        b.insert("samsung_mob".to_owned(), "4".to_owned());
        b
    }
}